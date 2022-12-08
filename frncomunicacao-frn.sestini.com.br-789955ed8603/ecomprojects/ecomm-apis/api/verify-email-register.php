<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once("tokens-vtex.php");

$email = filter_var($_GET['email'], FILTER_SANITIZE_EMAIL);
if($email == ''){
    echo json_encode(["err" => true]);
    exit;
}

// Request mail
$endpoint = "https://sestini.vtexcommercestable.com.br/api/dataentities/CL/search?_fields=id&_where=email=$email";
$postHeaders = array(
    "X-VTEX-API-AppKey: $appKey",
    "X-VTEX-API-AppToken: $appToken",
);
$ch = curl_init($endpoint);
curl_setopt($ch, CURLOPT_HTTPHEADER, $postHeaders);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, 0);
$data = curl_exec($ch);
curl_close($ch);
echo $data;