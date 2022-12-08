<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once("tokens-vtex.php");
$tokenVP = "e56cca64cb977ccbb92cf01631d4a75e39c04498";

$email = filter_var($_GET['email'], FILTER_SANITIZE_STRING);
$value = filter_var($_GET['value'], FILTER_SANITIZE_STRING);
$postHeaders = array(
    "X-VTEX-API-AppKey: $appKey",
    "X-VTEX-API-AppToken: $appToken",
);

// Get document
$endpoint = "https://sestini.vtexcommercestable.com.br/api/dataentities/CL/search?_fields=document&email=$email";
$ch = curl_init($endpoint);
curl_setopt($ch, CURLOPT_HTTPHEADER, $postHeaders);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, 0);
$data = curl_exec($ch);
$array_data = json_decode($data, true);

$cpf = $array_data[0]['document'];

// GET installments
// Inicia a requisão para salvar os dados no master data
$endpoint = "https://core.usevirtus.com.br/api/v1/installments";
$postData = array(
    "total_amount" => $value,
    "cpf" => $cpf
);

$postHeaders = array(
    "Authorization: Token $tokenVP",
    "Content-Type: application/json",
);

// Faz a Request
$curl = curl_init($endpoint);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_HTTPHEADER, $postHeaders);
curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($postData));
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($curl);
curl_close($curl);

print_r($response);