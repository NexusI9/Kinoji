<?php

include './connection.php';

function filter_to_key($ar, $skey, $unique=False){
  $tempar = array();
  foreach ($ar as $key => $value){ $tempar[$key] = $value[$skey]; }

  $tempar = array_filter($tempar);
  if($unique){ $tempar = array_unique($tempar); }
  return $tempar;
}
function add_percent($ar){
  foreach ($ar as $key => $value) { $ar[$key] = '%'.$value.'%';  }
  return $ar;
}
function to_json($data, $key=NULL){
  $decoded = (array) json_decode(stripslashes( $data ));
  if($key){ return $decoded[$key]; }
  return $decoded;
}

$connection = new Connection();
$body = json_decode(file_get_contents('php://input'),true);


switch($body['type']){

  //---------EMAIL
  case 'addLead':
    $stm = $connection->pdo->prepare("INSERT INTO leads (create_time,name,email) VALUES (:crt,:name,:mail)");
    $stm->bindParam(':crt',date("Y-m-d H:i:s"),PDO::PARAM_STR);
    $stm->bindParam('name',$body['name'],PDO::PARAM_STR);
    $stm->bindParam('mail',$body['email'],PDO::PARAM_STR);
    $stm->execute();
  break;

  //--------MOVIES
  case 'getLatestMovies':
    echo json_encode( $connection->query("SELECT * FROM movies ORDER BY added DESC LIMIT ?",  [ $body['limit'] ] ) );
  break;

  case 'getMovieFromId':
    echo json_encode( $connection->query("SELECT * FROM movies WHERE id = ?", [ $body['id'] ] ));
  break;

  case 'getAllMovies':
    echo json_encode( $connection->get('movies') );
  break;

  case 'getRandomMovies':
    echo json_encode( $connection->query("SELECT * from movies ORDER BY RAND() LIMIT ?", [$body['limit']] ) );
  break;

  case 'getRandomShots':
    $randMovies = $connection->query("SELECT * from movies ORDER BY RAND() LIMIT ?", [$body['limit']] );
    $shots = filter_to_key($randMovies, 'shots');
    $id = filter_to_key($randMovies,'id');

    foreach ($shots as $key => $value) {
      $shotArray[$key] = explode(';', $shots[$key]);
      $chosenShot = $shotArray[$key][ array_rand( $shotArray[$key] ) ];

      $result[$key] = array(
        "path" => "/assets/movies/{$randMovies[$key]["folder"]}/{$chosenShot}.webp",
        "name" => $chosenShot,
        "movie" => $randMovies[$key]
      );

    }
    echo json_encode( $result );

  break;

  //--------GENRES
  case 'getGenresNames':
    echo json_encode( $connection->query("SELECT name FROM genres") );
  break;

  case 'getGenre':
    if( $body['genre'] == ''){
      echo json_encode( $connection->query("SELECT * FROM genres") );
    }else{
      echo json_encode( $connection->query("SELECT * FROM genres WHERE name = ?", [ $body['genre'] ] ) );
    }
  break;

  case 'getMoviesFromGenre':
    echo json_encode( $connection->getMoviesFromGenre($body["genre"], $body["limit"]) );
  break;


  //--------PEOPLES


  case 'getAllPeoples':
    echo json_encode( $connection->query("SELECT * FROM peoples") );
  break;

  case 'getPeopleFromId':
    echo json_encode( $connection->query("SELECT * FROM peoples WHERE id = ?", [ $body['id'] ]) );
  break;

  case 'getMoviesFromPeople':
    $id = $body['id'];
    echo json_encode( $connection->query("SELECT * from movies WHERE director = ? OR dop = ? OR artdir = ?", [$id, $id, $id]) );
  break;



  //--------DIRECTORS
  case 'getMoviesFromDir':
    echo json_encode( $connection->query("SELECT * from movies WHERE director = ?", [$body['id']]) );
  break;

  case 'getMoviesFromCountry':
    echo json_encode( $connection->query("SELECT * from movies WHERE country = ?", [$body['country']]) );
  break;

  case 'getDirectorFromId':
    echo json_encode( $connection->query("SELECT * FROM peoples WHERE id = ? AND job='director'", [ $body['id'] ]) );
  break;

  case 'getDirector':
    echo json_encode( $connection->query("SELECT * FROM peoples WHERE id = ? AND job='director'",[ $body['id'] ] ) );
  break;

  case 'getAllDirectors':
    echo json_encode( $connection->query("SELECT * FROM peoples WHERE job='director'") );
  break;

  case 'getDirFromGenre':

    $moviesFromGenre = $connection->getMoviesFromGenre($body["genre"]);
    
    $directors = filter_to_key($moviesFromGenre, 'director');
    $directors = array_unique($directors);
    
    foreach ($directors as $key => $id) {
      $directors[$key] = $connection->query("SELECT * FROM peoples WHERE id = ? AND job='director'", [$id]);
      if(!count($directors[$key])){ unset( $directors[$key] ); }
      else{ $directors[$key] = $directors[$key][0]; }
    }
    
    $directors = array_values($directors);

    echo json_encode($directors);
    
  break;


  case 'getPeoplesFromGenre':

    $moviesFromGenre = $connection->getMoviesFromGenre($body["genre"]);
    $jobs = filter_to_key($connection->query("SELECT DISTINCT job FROM peoples"), 'job');
    $peoples = array();

    foreach ($jobs as $job) {
      $peoples[$job] = filter_to_key($moviesFromGenre, $job, True);

      
      foreach($peoples[$job] as $key => $peopleId){
        $peoples[$job][$key] = $connection->query("SELECT * FROM peoples WHERE id = ?", [$peopleId]);
        if(isset($peoples[$job][$key][0])){ $peoples[$job][$key] = $peoples[$job][$key][0]; }
      }

      $peoples[$job] = array_values(array_filter($peoples[$job]));

    }


    echo json_encode($peoples);


    /*
    $directors = array_values($directors);

    echo json_encode($directors);
    */
    
  break;

  //--------HISTORY

  case 'getHistoryFromCountry':
    if(!$body["type"]){
        echo json_encode( $connection->query("SELECT * FROM history WHERE country = ?", [ $body["country"] ]) );
    }else{
        echo json_encode( $connection->query("SELECT * FROM history WHERE country = ? AND type = ?", [ $body["country"], $body["type"] ]) );
    }
  break;

  case 'getCountriesFromHistory':
    echo json_encode( $connection->query("SELECT DISTINCT country FROM history") );
  break;

  case 'getAllHistory':
    $obj = array();

    $countries = $connection->query("SELECT DISTINCT country FROM history");
    foreach ($countries as $key => $value) {
      $country = $value['country'];
      $obj[$key]['name'] = $country;
      $obj[$key]['movies'] = $connection->query("SELECT * FROM movies WHERE country = ?", [$country] );
      $obj[$key]['events'] = $connection->query("SELECT * FROM history WHERE country = ? and type = 'event' ", [$country] );
      $obj[$key]['segments'] = $connection->query("SELECT * FROM history WHERE country = ? and type = 'segment' ", [$country] );
    }

    echo json_encode((array) $obj);
  break;

  //--------AESTHETICS
  case 'getColors':
    echo json_encode( filter_to_key($connection->query("SELECT DISTINCT family FROM colors"), 'family') );
  break;

  case 'getTags':
    $tags = $connection->query("SELECT tag FROM movies");
    $tags = filter_to_key($tags,'tag');
    $tags = join(';',$tags);
    $tags = explode(';',$tags);
    $tags = array_diff($tags, array(''));
    $tags = array_values(array_unique($tags));
    echo json_encode($tags);
  break;

  case 'getMoviesFromTags':

    //print_r( json_decode( $body['tags'] ) );
    $tags =  $body['tags'];

    $query = $connection->buildQuery( array(
      "statement" => function($c){ return "SELECT * FROM movies WHERE {$c}"; },
      "arguments" => $tags,
      "condition" => "tag LIKE ?",
      "operator" => "AND"
    ) );


    echo json_encode( $connection->query($query, add_percent($tags))) ;

  break;

  case 'getShotsWithColours':
    $colours = add_percent($body["colours"]);
    $id = $param["id"];

    if($id){ //get shots for specific ID

      $query = $connection->buildQuery( array(
        "statement" => function($c){ return "SELECT shots FROM aesthetics WHERE id = ? AND ({$c})"; },
        "arguments" => $colours,
        "condition" => "LOWER(COLOURS) LIKE ?",
        "operator" => "OR"
      ) );

      echo json_encode( $connection->query($query, [$id, $colours]) );
      return;
    }

    $query = $connection->buildQuery( array(
      "statement" => function($c){ return "SELECT * FROM aesthetics WHERE {$c} "; },
      "arguments" => $colours,
      "condition" => "LOWER(COLOURS) LIKE ?",
      "operator" => "OR"
    ) );

    $result = $connection->query( $query, add_percent($colours) );

    echo json_encode( array(
      "shots" => filter_to_key($result, "shots"),
      "movies" => array_unique( filter_to_key($result,"id") )
    ) );
  break;

  case 'getTagSummary':
    echo json_encode( $connection->query('SELECT summary FROM tags WHERE name = ?',[$body['tag']]) );
  break;

  case 'getMoviesFromColours':
    $colours = add_percent($body['colours']);

    $query = $connection->buildQuery( array(
      "statement" => function($c){ return "SELECT DISTINCT movies.* , GROUP_CONCAT(DISTINCT aesthetics.shots SEPARATOR ';') as shots FROM movies INNER JOIN aesthetics WHERE movies.id = aesthetics.id AND ({$c}) GROUP BY movies.id"; },
      "arguments" => $colours,
      "condition" => "aesthetics.colours LIKE ?",
      "operator" => 'OR'
    ));

    $result = $connection->query($query,$colours);
    echo json_encode($result);

  break;

  //--------SUGGESTION
  case 'getSuggestion':
    $query = '%'.$body['suggestion'].'%';

    function setTotal($ar){
      $sum = 0;
      foreach ($ar as $key => $value) { $sum += count($ar[$key]); }
      return $sum;
    }

    $arResult = array(
        "movies" => $connection->query("SELECT * FROM movies WHERE title LIKE ?",[$query]),
        "dops" => $connection->query("SELECT * FROM peoples WHERE name LIKE ? AND job='dop'",[$query]),
        "directors" => $connection->query("SELECT * FROM peoples WHERE name LIKE ? AND job='director' ",[$query]),
        "artdirs" => $connection->query("SELECT * FROM peoples WHERE name LIKE ? AND job='artdir' ",[$query]),
        "collections" => $connection->query("SELECT * FROM genres WHERE name LIKE ?",[$query]),
        "colours" => $connection->query("SELECT DISTINCT family FROM colors WHERE family LIKE ?",[$query]),
    );
    $totalResult = array( "total" => setTotal($arResult) );

    echo json_encode( array_merge($arResult, $totalResult) );
  break;

  default:
    echo "no type found";


}



?>
