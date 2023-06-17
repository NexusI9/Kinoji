<?php
function search($connection, $body)
{
  switch ($body['type']) {

    case 'GET_SUGGESTION':
      $query = '%' . $body['suggestion'] . '%';

      function setTotal($ar)
      {
        $sum = 0;
        foreach ($ar as $key => $value) {
          $sum += count($ar[$key]);
        }
        return $sum;
      }

      $arResult = array(
        "movies" => $connection->query("SELECT * FROM movies WHERE title LIKE ?", [$query]),
        "dops" => $connection->query("SELECT * FROM peoples WHERE name LIKE ? AND job='dop'", [$query]),
        "directors" => $connection->query("SELECT * FROM peoples WHERE name LIKE ? AND job='director' ", [$query]),
        "artdirs" => $connection->query("SELECT * FROM peoples WHERE name LIKE ? AND job='artdir' ", [$query]),
        "collections" => $connection->query("SELECT * FROM genres WHERE name LIKE ?", [$query]),
        "colours" => $connection->query("SELECT DISTINCT family FROM colors WHERE family LIKE ?", [$query]),
      );
      $totalResult = array("total" => setTotal($arResult));

      echo json_encode(array_merge($arResult, $totalResult));
      break;

    default:
  }
}