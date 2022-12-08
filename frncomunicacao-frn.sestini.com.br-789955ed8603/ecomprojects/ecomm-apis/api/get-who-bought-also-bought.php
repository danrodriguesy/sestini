<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once("tokens-vtex.php");

$productId = filter_var($_GET['id'], FILTER_SANITIZE_NUMBER_INT);
$endpoint = "https://sestini.vtexcommercestable.com.br/api/catalog_system/pub/products/crossselling/whoboughtalsobought/$productId";
$ch = curl_init($endpoint);
curl_setopt($ch, CURLOPT_HTTPHEADER, $postHeaders);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, 0);
$data = curl_exec($ch);

print_r($data);
