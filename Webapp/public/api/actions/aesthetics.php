<?php
require_once __DIR__.'/../lib/utilities.php';

function aesthetics($connection, $body)
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
      $id = $body["id"];

      if ($id) { //get shots for specific ID

        $query = $connection->buildQuery(
          array(
            "statement" => function ($c) {
              return "SELECT shots FROM aesthetics WHERE id = ? AND ({$c})";
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
            return "SELECT * FROM aesthetics WHERE {$c} ";
          },
          "arguments" => $colours,
          "condition" => "LOWER(COLOURS) LIKE ?",
          "operator" => "OR"
        )
      );

      $result = $connection->query($query, add_percent($colours));

      echo json_encode(
        array(
          "shots" => filter_to_key($result, "shots"),
          "movies" => array_unique(filter_to_key($result, "id"))
        )
      );
      break;

    case 'GET_TAG_SUMMARY':
      echo json_encode($connection->query('SELECT summary FROM tags WHERE name = ?', [$body['tag']]));
      break;

    case 'GET_MOVIES_FROM_COLORS':
      $colours = add_percent($body['colours']);

      $query = $connection->buildQuery(
        array(
          "statement" => function ($c) {
            return "SELECT DISTINCT movies.* , GROUP_CONCAT(DISTINCT aesthetics.shots SEPARATOR ';') as shots FROM movies INNER JOIN aesthetics WHERE movies.id = aesthetics.id AND ({$c}) GROUP BY movies.id";
          },
          "arguments" => $colours,
          "condition" => "aesthetics.colours LIKE ?",
          "operator" => 'OR'
        )
      );

      $result = $connection->query($query, $colours);
      echo json_encode($result);

      break;

    default:
  }
}
