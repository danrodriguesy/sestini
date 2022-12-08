<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once("tokens-vtex.php");

// Request similar products
$endpoint = "https://sestini.vtexcommercestable.com.br/api/dataentities/ES/search?_fields=address%2CsearchTerm%2Cbrowser%2Cos%2Cnegative%2Cneutral%2Cpositive%2CcreatedIn&_sort=createdIn%20DESC";
$postHeaders = array(
    "X-VTEX-API-AppKey: $appKey",
    "X-VTEX-API-AppToken: $appToken",
    "REST-Range: resources=0-1000"
);
$ch = curl_init($endpoint);
curl_setopt($ch, CURLOPT_HTTPHEADER, $postHeaders);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, 0);
$data = curl_exec($ch);
curl_close($ch);
echo $data;
