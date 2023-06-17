<?php
    require_once __DIR__.'/../lib/utilities.php';

    function movies($connection, $body){
        switch($body['type']){

            case 'GET_LATEST_MOVIES':
                echo json_encode($connection->query("SELECT * FROM movies ORDER BY added DESC LIMIT ?", [$body['limit']]));
                break;
            
              case 'GET_MOVIE_FROM_ID':
                echo json_encode($connection->query("SELECT * FROM movies WHERE id = ?", [$body['id']]));
                break;
            
              case 'GET_ALL_MOVIES':
                echo json_encode($connection->get('movies'));
                break;
            
              case 'GET_RANDOM_MOVIES':
                echo json_encode($connection->query("SELECT * from movies ORDER BY RAND() LIMIT ?", [$body['limit']]));
                break;
            
              case 'GET_RANDOM_SHOTS':
                $randMovies = $connection->query("SELECT * from movies ORDER BY RAND() LIMIT ?", [$body['limit']]);
                $shots = filter_to_key($randMovies, 'shots');
                $id = filter_to_key($randMovies, 'id');
            
                foreach ($shots as $key => $value) {
                  $shotArray[$key] = explode(';', $shots[$key]);
                  $chosenShot = $shotArray[$key][array_rand($shotArray[$key])];
            
                  $result[$key] = array(
                    "path" => "/assets/movies/{$randMovies[$key]["folder"]}/{$chosenShot}.webp",
                    "name" => $chosenShot,
                    "movie" => $randMovies[$key]
                  );
            
                }
                echo json_encode($result);
            
                break;

                default:
        
        }
    }

?>