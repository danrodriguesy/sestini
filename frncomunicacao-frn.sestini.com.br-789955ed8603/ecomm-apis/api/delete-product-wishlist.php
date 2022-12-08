<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once("tokens-vtex.php");

$email = filter_var($_GET['email'], FILTER_SANITIZE_STRING);
$productId = filter_var($_GET['productId'], FILTER_SANITIZE_STRING);
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

// Append wishlist new item
$wishlistProducts = str_replace("[", "", $array_data['wishlistProducts']);
$wishlistProducts = str_replace("]", "", $wishlistProducts);
$wishlistProducts = explode(",", $wishlistProducts);
$wishlistProducts = array_diff($wishlistProducts, array($productId));
$wishlistProducts = implode(",", $wishlistProducts);

// Salvar wishlist
$endpoint = "https://www.sestini.com.br/api/dataentities/CL/documents/$documentId";
$postData = array(
    "wishlistProducts" => $wishlistProducts
);
$postHeaders = array(
    "Accept: application/vnd.vtex.ds.v10+json",
    "Content-Type: application/json",
    "X-VTEX-API-AppKey: $appKey",
    "X-VTEX-API-AppToken: $appToken"
);
$curl = curl_init($endpoint);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'PATCH');
curl_setopt($curl, CURLOPT_HTTPHEADER, $postHeaders);
curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($postData));
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($curl);
curl_close($curl);
