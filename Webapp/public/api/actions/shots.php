<?php
require_once __DIR__ . '/../lib/utilities.php';

function shots($connection, $body)
{
  switch ($body['type']) {

    case 'GET_COLORS':
      echo json_encode(filter_to_key($connection->query("SELECT DISTINCT family FROM colors"), 'family'));
      break;

    case 'GET_TAGS':
      $tags = $connection->query("SELECT tag FROM movies");
      $tags = filter_to_key($tags, 'tag');
      $tags = join(';', $tags);
      $tags = explode(';', $tags);
      $tags = array_diff($tags, array(''));
      $tags = array_values(array_unique($tags));
      echo json_encode($tags);
      break;

    case 'GET_MOVIES_FROM_TAGS':

      //print_r( json_decode( $body['tags'] ) );
      $tags = $body['tags'];

      $query = $connection->buildQuery(
        array(
          "statement" => function ($c) {
            return "SELECT * FROM movies WHERE {$c}";
          },
          "arguments" => $tags,
          "condition" => "tag LIKE ?",
          "operator" => "AND"
        )
      );


      echo json_encode($connection->query($query, add_percent($tags)));

      break;

    case 'GET_SHOTS_WITH_COLORS':
      $colours = add_percent($body["colours"]);

      $start = 0;
      $stop = 10;

      if (isset($body["start"])) {
        $start = $body["start"];
      }
      if (isset($body["stop"])) {
        $stop = $body["stop"];
      }

      if (isset($body["id"])) { //get shots for specific ID
        $id = $body["id"];
        $query = $connection->buildQuery(
          array(
            "statement" => function ($c) {
              return "SELECT name FROM shots WHERE id = ? AND ($c)";
            },
            "arguments" => $colours,
            "condition" => "LOWER(COLOURS) LIKE ?",
            "operator" => "OR"
          )
        );

        echo json_encode($connection->query($query, [$id, $colours]));
        return;
      }

      $query = $connection->buildQuery(
        array(
          "statement" => function ($c) {
            return "SELECT * FROM shots WHERE $c";
          },
          "arguments" => $colours,
          "condition" => "LOWER(COLOURS) LIKE ?",
          "operator" => "OR",
          "suffix" => "ORDER BY name LIMIT $start,$stop"
        )
      );

      $result = $connection->query($query, add_percent($colours));

      function get_movie($ar)
      {
        global $connection;
        $mv = $connection->query('SELECT * FROM movies WHERE id = ?', [$ar['id']]);
        return array_merge(
          $ar,
          array("fullpath" => "/assets/movies/{$ar['folder']}/{$ar['name']}.webp"),
          array("movie" => $mv[0])
        );
      }

      $result = array_map('get_movie', $result);

      echo json_encode($result);
      break;

    case 'GET_LIGHTS':
      echo json_encode( array("Vibrant", "Natural", "High Contrast", "Low Contrast") );
      break;

    case 'GET_SUBJECTS':
      echo json_encode( array() );
      break;

    case 'GET_TAG_SUMMARY':
      echo json_encode($connection->query('SELECT summary FROM tags WHERE name = ?', [$body['tag']]));
      break;

    case 'GET_MOVIES_FROM_COLORS':
      $colours = add_percent($body['colours']);

      $query = $connection->buildQuery(
        array(
          "statement" => function ($c) {
            return "SELECT DISTINCT movies.* , GROUP_CONCAT(DISTINCT shots.name SEPARATOR ';') as shot FROM movies INNER JOIN shots WHERE movies.id = shots.id AND ({$c}) GROUP BY movies.id";
          },
          "arguments" => $colours,
          "condition" => "shots.colours LIKE ?",
          "operator" => 'OR'
        )
      );

      $result = $connection->query($query, $colours);
      echo json_encode($result);

      break;

    case "GET_SHOTS_FROM_QUERIES":
      
      $colours = isset($body['colours']) ? str_replace(' ','|',$body['colours']) : null;
      $lights = isset($body['lights']) ? $body['lights'] : null;
      $subjects = isset($body['subjects']) ? array($body['subjects']) : null;

      $start = isset($body['start']) ? $body['start'] : 0;
      $stop = isset($body['stop']) ? $body['stop'] : 10;

      $lightThreshold = 0.5;

      if(!$colours && !$lights && !$subjects){ 
        echo json_encode(array()); 
        return;
      }

      
      $query = "SELECT * FROM shots";

      //set filters condifitons query
      $filters = array();
      if($colours){ array_push($filters, "colours REGEXP '$colours'"); }
      if($lights){ 
        if( stripos($lights, "high contrast") !== false ){ array_push($filters, "contrast > ". $lightThreshold);  }
        if( stripos($lights, "low contrast") !== false ){ array_push($filters, "contrast < ". $lightThreshold);  }
        if( stripos($lights, "vibrant") !== false ){ array_push($filters, "vibrance > ". $lightThreshold);  }
        if( stripos($lights, "natural") !== false ){ array_push($filters, "vibrance < ". $lightThreshold);  }
      }
      
      //concat filter with AND
      if(count($filters)){
        $query .=  " WHERE ";
        $query .= implode(" AND ", $filters);
      }

      $query .= " LIMIT $start,$stop";

      $shots = $connection->query($query);

      //add movies to shots objects
      if($shots && count($shots)){

        function get_movie($ar)
        {
          global $connection;
          $mv = $connection->query('SELECT * FROM movies WHERE id = ?', [$ar['id']]);
          return array_merge(
            $ar,
            array("fullpath" => "/assets/movies/{$ar['folder']}/{$ar['name']}.webp"),
            array("movie" => $mv[0])
          );
        }

        $shots = array_map('get_movie', $shots);
      }

      echo json_encode($shots);

    break;

    default:
  }
}
