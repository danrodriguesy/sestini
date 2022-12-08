<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once("tokens-vtex.php");

$email = filter_var($_GET['email'], FILTER_SANITIZE_STRING);
$postHeaders = array(
    "X-VTEX-API-AppKey: $appKey",
    "X-VTEX-API-AppToken: $appToken",
);

// Get document ID
$endpoint = "https://sestini.vtexcommercestable.com.br/api/dataentities/CL/search?_fields=documentId&email=$email";
$ch = curl_init($endpoint);
curl_setopt($ch, CURLOPT_HTTPHEADER, $postHeaders);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, 0);
$data = curl_exec($ch);
$array_data = json_decode($data, true);

$documentId = $array_data[0]['id'];

// Get wishlist
$endpoint = "https://sestini.vtexcommercestable.com.br/api/dataentities/CL/documents/$documentId?_fields=wishlistProducts";
$ch = curl_init($endpoint);
curl_setopt($ch, CURLOPT_HTTPHEADER, $postHeaders);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, 0);
$data = curl_exec($ch);
$array_data = json_decode($data, true);

print_r(json_encode($array_data));