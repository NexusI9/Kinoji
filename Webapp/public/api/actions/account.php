<?php
function account($connection, $body)
{
    switch ($body['type']) {
        case 'ADD_LEAD':
            $stm = $connection->pdo->prepare("INSERT INTO leads (create_time,name,email) VALUES (:crt,:name,:mail)");
            $stm->bindParam(':crt', date("Y-m-d H:i:s"), PDO::PARAM_STR);
            $stm->bindParam('name', $body['name'], PDO::PARAM_STR);
            $stm->bindParam('mail', $body['email'], PDO::PARAM_STR);
            $stm->execute();
            break;

        default:
    }
}
