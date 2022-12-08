<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once("ecom-db-connection.php");
$connection = Conexao::getConnection();

// GET Token
$select_refresh_query = "SELECT TOP 150 REFRESH_TOKEN FROM RdIntegrationToken WHERE REFRESH_TOKEN != '' ORDER BY ID DESC";
$select_refresh_stmt = $connection->prepare($select_refresh_query);
$select_refresh_stmt->execute();
$select_refresh_result = $select_refresh_stmt->fetchAll();
print_r(json_encode($select_refresh_result[0]));