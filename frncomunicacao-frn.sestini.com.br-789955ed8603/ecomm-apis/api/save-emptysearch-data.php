<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once "tokens-vtex.php";

$searchTerm = filter_var($_GET['searchTerm'], FILTER_SANITIZE_STRING);
$os = filter_var($_GET['os'], FILTER_SANITIZE_STRING);
$browser = filter_var($_GET['browser'], FILTER_SANITIZE_STRING);
$address = $_GET['address'];

if ($searchTerm == '' || $os == '' || $browser == '') {
    echo json_encode(["err" => true]);
    exit;
}

// Inicia a requisão para salvar os dados no master data
$endpoint = "https://www.sestini.com.br/api/dataentities/ES/documents";
$postData = array(
    "searchTerm"  => $searchTerm,
    "browser"  => $browser,
    "os"    => $os,
    "address"    => $address,
);

$postHeaders = array(
    "Accept: application/vnd.vtex.ds.v10+json",
    "Content-Type: application/json",
    "X-VTEX-API-AppKey: $appKey",
    "X-VTEX-API-AppToken: $appToken"
);

// Faz a Request
$curl = curl_init($endpoint);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_HTTPHEADER, $postHeaders);
curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($postData));
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($curl);
curl_close($curl);
