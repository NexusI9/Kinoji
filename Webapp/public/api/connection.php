<?php

class Connection{

  public function __construct(){

    $args = $this->DSN('website');
    if( $_SERVER['HTTP_HOST'] == 'localhost' || $_SERVER['HTTP_HOST'] == '127.0.0.1' ){ $args = $this->DSN('local'); }

    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    $dsn = "mysql:host={$args['host']};dbname={$args['database']};charset={$args['charset']};port={$args['port']}";
    try {
         $this->pdo = new PDO($dsn, $args['user'],  $args['pass'], $options);
    } catch (PDOException $e) {
         throw new PDOException($e->getMessage(), (int)$e->getCode());
    }

  }

  private function DSN($type){

    $pass = 'tW4_DFA7$8ax2pX';
    $port = "3306";
    $charset = 'utf8mb4';

    switch($type){
      case 'local':
        $host = '127.0.0.1';
        $db   = 'elkha997290';
        $user = 'root';
      break;

      case 'website':
        $host = '185.98.131.92';
        $db   = 'elkha997290';
        $user = 'elkha997290';
      break;
    }


    return array(
      "host" => $host,
      "database" => $db,
      "user" => $user,
      "pass" => $pass,
      "port" => $port,
      "charset" => $charset
    );

  }

  public function buildQuery($param){
    //statement fc()
    //arguments array()
    //condition string
    // operator string

    $str = array();
    foreach ($param["arguments"] as $key => $value) {
      $str[$key] = $param["condition"];
    }

    $str = join(" {$param["operator"]} ", $str);

    return $param["statement"]($str);
  }

  public function get($table){
    $query = "SELECT * FROM ".$table;
    $statement = $this->pdo->prepare($query);
    $statement->execute();
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
    return $results;
  }

  public function query($query,$opts = NULL){
    $statement = $this->pdo->prepare($query);
    if(isset($opts)){
      foreach($opts as $key => $o){ 
        $statement->bindParam($key+1,$o,PDO::PARAM_STR); 
      }
    }
    $statement->execute();
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
    return $results;
  }

  public function getDirFromID($id){
    $query = $this->pdo->prepare("SELECT * FROM directors WHERE id = ?;");
    $query->bindParam(1,$id, PDO::PARAM_INT);
    $query->execute();
    $results = $query->fetchAll(PDO::FETCH_ASSOC);
    return $results[0];
  }

  public function getIDFromDir($dir){

    $query = $this->pdo->prepare("SELECT id FROM directors WHERE name = ?;");
    $query->bindParam(1,$dir, PDO::PARAM_STR);
    $query->execute();
    $results = $query->fetchAll(PDO::FETCH_ASSOC);
    return $results[0]["id"];
  }

  public function getMoviesFromGenre($genre, $limit = NULL){
        $moviesId = $this->query("SELECT movies FROM genres WHERE name = ?", [$genre]);
        $moviesId = $moviesId[0]['movies'];
        $moviesId = explode(';', $moviesId);
        $idQueue = implode(',', array_fill(0, count($moviesId), '?'));

        $query = "SELECT * FROM movies WHERE id in ($idQueue)";
        if($limit){
          $query = "SELECT * FROM movies WHERE id in ($idQueue) LIMIT $limit";
        }

        $stm = $this->pdo->prepare($query);
        foreach($moviesId as $key => $id){  $stm->bindValue($key+1,$id);  }
        $stm->execute();
        $result = $stm->fetchAll(PDO::FETCH_ASSOC);
        return $result;
  }

}


?>
