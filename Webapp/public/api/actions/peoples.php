<?php
require_once __DIR__.'/../lib/utilities.php';

function peoples($connection, $body)
{
  switch ($body['type']) {

    case 'GET_MOVIES_FROM_DIR':
      echo json_encode($connection->query("SELECT * from movies WHERE director = ?", [$body['id']]));
      break;

    case 'GET_MOVIES_FROM_COUNTRY':
      echo json_encode($connection->query("SELECT * from movies WHERE country = ?", [$body['country']]));
      break;

    case 'GET_DIRECTOR_FROM_ID':
      echo json_encode($connection->query("SELECT * FROM peoples WHERE id = ? AND job='director'", [$body['id']]));
      break;

    case 'GET_DIRECTOR':
      echo json_encode($connection->query("SELECT * FROM peoples WHERE id = ? AND job='director'", [$body['id']]));
      break;

    case 'GET_ALL_DIRECTORS':
      echo json_encode($connection->query("SELECT * FROM peoples WHERE job='director'"));
      break;


    case 'GET_PEOPLES_FROM_COLLECTION':

      $moviesFromGenre = $connection->getMoviesFromCollection($body["genre"]);
      $jobs = filter_to_key($connection->query("SELECT DISTINCT job FROM peoples"), 'job');
      $peoples = array();

      foreach ($jobs as $job) {
        $peoples[$job] = filter_to_key($moviesFromGenre, $job, True);


        foreach ($peoples[$job] as $key => $peopleId) {
          $peoples[$job][$key] = $connection->query("SELECT * FROM peoples WHERE id = ?", [$peopleId]);
          if (isset($peoples[$job][$key][0])) {
            $peoples[$job][$key] = $peoples[$job][$key][0];
          }
        }

        $peoples[$job] = array_values(array_filter($peoples[$job]));
      }


      echo json_encode($peoples);
      break;

    case 'GET_ALL_PEOPLES':
      echo json_encode($connection->query("SELECT * FROM peoples"));
      break;

    case 'GET_PEOPLE_FROM_ID':
      echo json_encode($connection->query("SELECT * FROM peoples WHERE id = ?", [$body['id']]));
      break;

    case 'GET_MOVIES_FROM_PEOPLE':
      $id = $body['id'];
      echo json_encode($connection->query("SELECT * from movies WHERE director = ? OR dop = ? OR artdir = ?", [$id, $id, $id]));
      break;

    default:
  }
}
