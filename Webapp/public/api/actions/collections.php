<?php
function collections($connection, $body)
{
  switch ($body['type']) {
    case 'GET_COLLECTIONS_NAMES':
      echo json_encode($connection->query("SELECT name FROM genres"));
      break;

    case 'GET_COLLECTION':
      if ($body['genre'] == '') {
        echo json_encode($connection->query("SELECT * FROM genres"));
      } else {
        echo json_encode($connection->query("SELECT * FROM genres WHERE name = ?", [$body['genre']]));
      }
      break;

    case 'GET_MOVIES_FROM_COLLECTION':
      echo json_encode($connection->getMoviesFromCollection($body["genre"], $body["limit"]));
      break;

    default:
  }
}
