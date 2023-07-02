<?php
    function history($connection, $body){
        switch($body['type']){

            case 'GET_HISTORY_FROM_COUNTRY':
                if (!$body["type"]) {
                  echo json_encode($connection->query("SELECT * FROM history WHERE country = ?", [$body["country"]]));
                } else {
                  //russia exception
                  $country = $body['country'];
                  if($country == 'russia'){ $country = 'Soviet Union'; }
                  echo json_encode($connection->query("SELECT * FROM history WHERE country = ? AND type = ?", [$body["country"], $body["type"]]));
                }
                break;
            
              case 'GET_COUNTRIES_FROM_HISTORY':
                echo json_encode($connection->query("SELECT DISTINCT country FROM history"));
                break;
            
              case 'GET_ALL_HISTORY':
                $obj = array();
            
                $countries = $connection->query("SELECT DISTINCT country FROM history");
                foreach ($countries as $key => $value) {
                  $country = $value['country'];
                  $movieCountry = ($country == 'russia') ? 'Soviet Union' : $country;
                  
                  $obj[$key]['name'] = $country;
                  $obj[$key]['movies'] = $connection->query("SELECT * FROM movies WHERE country = ?", [$movieCountry]);
                  $obj[$key]['events'] = $connection->query("SELECT * FROM history WHERE country = ? and type = 'event' ", [$country]);
                  $obj[$key]['segments'] = $connection->query("SELECT * FROM history WHERE country = ? and type = 'segment' ", [$country]);
                }
            
                echo json_encode((array) $obj);
                break;
                
            default:
        
        }
    }
?>


