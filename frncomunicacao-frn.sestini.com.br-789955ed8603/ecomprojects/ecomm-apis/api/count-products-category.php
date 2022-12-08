<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once("tokens-vtex.php");

$categoryId = filter_var($_GET['categoryId'], FILTER_SANITIZE_NUMBER_INT);
// Request similar products
$endpoint = "https://sestini.vtexcommercestable.com.br/api/catalog_system/pvt/products/GetProductAndSkuIds?categoryId=$categoryId&_from=1&_to=50";
$postHeaders = array(
    "X-VTEX-API-AppKey: $appKey",
    "X-VTEX-API-AppToken: $appToken",
);
$ch = curl_init($endpoint);
curl_setopt($ch, CURLOPT_HTTPHEADER, $postHeaders);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, 0);
$data = curl_exec($ch);
$array_data = json_decode($data, true);

curl_close($ch);
echo json_encode(array("result" => $array_data['range']['total']));
