<?php

require_once 'lib/connection.php';
require_once 'actions/account.php';
require_once 'actions/shots.php';
require_once 'actions/collections.php';
require_once 'actions/history.php';
require_once 'actions/peoples.php';
require_once 'actions/movies.php';
require_once 'actions/search.php';
require_once 'lib/mail.php';


$connection = new Connection();
$body = json_decode(file_get_contents('php://input'), true);

account($connection, $body);
shots($connection, $body);
collections($connection, $body);
history($connection, $body);
peoples($connection, $body);
movies($connection, $body);
search($connection, $body);
sendmail($body);
