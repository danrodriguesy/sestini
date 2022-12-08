<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once("tokens-vtex.php");

$productId = filter_var($_GET['skuId'], FILTER_SANITIZE_NUMBER_INT);
if($productId == ''){
    echo "You need to provide a skuId";
    exit;
}

// Request similar products
$endpoint = "https://sestini.vtexcommercestable.com.br/api/catalog_system/pub/products/crossselling/similars/$productId";
$postHeaders = array(
    "X-VTEX-API-AppKey: $appKey",
    "X-VTEX-API-AppToken: $appToken"
);
$ch = curl_init($endpoint);
curl_setopt($ch, CURLOPT_HTTPHEADER, $postHeaders);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, 0);
$data = curl_exec($ch);
curl_close($ch);
echo $data;
