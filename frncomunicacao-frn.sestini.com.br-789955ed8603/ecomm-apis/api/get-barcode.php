<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once("tokens-vtex.php");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$orderId = filter_var($_GET['orderId'], FILTER_SANITIZE_STRING);
$apiTokenIUGU = "c983e51c547e85f4262716353db320eb";
// GET Order
$endpoint    = "https://sestini.vtexcommercestable.com.br/api/oms/pvt/orders/$orderId";
$postHeaders = array(
    "X-VTEX-API-AppKey: $appKey",
    "X-VTEX-API-AppToken: $appToken"
);
$ch = curl_init($endpoint);
curl_setopt($ch, CURLOPT_HTTPHEADER, $postHeaders);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, 0);
$data = curl_exec($ch);
$array_data = json_decode($data, true);
curl_close($ch);

$transactionId = $array_data['paymentData']['transactions'][0]['payments'][0]['tid'];

// GET Barcode
$endpoint    = "https://api.iugu.com/v1/invoices/$transactionId?api_token=$apiTokenIUGU";
$ch = curl_init($endpoint);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, 0);
$data = curl_exec($ch);
$array_data = json_decode($data, true);
curl_close($ch);
$barcode = $array_data['bank_slip']['digitable_line'];

print_r(json_encode(array($barcode)));