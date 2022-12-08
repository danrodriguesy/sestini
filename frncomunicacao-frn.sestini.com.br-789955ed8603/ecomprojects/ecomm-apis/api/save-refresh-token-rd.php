<?php
header('Access-Control-Allow-Origin: *');
require_once("ecom-db-connection.php");
$connection = Conexao::getConnection();

$refresh_token = filter_var($_GET['refresh_token'], FILTER_SANITIZE_STRING);

// GET Token
$insert_refresh_query = "INSERT INTO RdIntegrationToken (REFRESH_TOKEN) VALUES (?)";
$stmt = $connection->prepare($insert_refresh_query);
$stmt->execute(array($refresh_token));
