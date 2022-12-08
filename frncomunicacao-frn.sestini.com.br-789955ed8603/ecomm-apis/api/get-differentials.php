<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once("tokens-vtex.php");
// Request similar products
$endpoint = "https://sestini.vtexcommercestable.com.br/api/dataentities/DF/search?_fields=name,description&_where=name+is+not+null";
$postHeaders = array(
    "Content-Type: application/json",
    "Accept: application/json",
    "X-VTEX-API-AppKey: $appKey",
    "X-VTEX-API-AppToken: $appToken",
    "Rest-Range: resources=0-1000",
);
$ch = curl_init($endpoint);
curl_setopt($ch, CURLOPT_HTTPHEADER, $postHeaders);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, 0);
$data = curl_exec($ch);
$array_data = json_decode($data, true);
print_r(json_encode($array_data));

curl_close($ch);
