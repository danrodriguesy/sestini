<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once("get-rd-token-functions.php");

$email    = filter_var($_GET['email'], FILTER_SANITIZE_EMAIL);
$name     = filter_var($_GET['name'], FILTER_SANITIZE_STRING);
$birthday = filter_var($_GET['birthday'], FILTER_SANITIZE_STRING);
$phone    = filter_var($_GET['phone'], FILTER_SANITIZE_STRING);
$gender   = filter_var($_GET['gender'], FILTER_SANITIZE_STRING);

if ($email == '' || $name == '') {
    echo json_encode(array("success" => false));
    exit;
}

$token = getAccessToken();

// Register user
$endpoint = "https://api.rd.services/platform/contacts/email:$email";
$postHeaders = array(
    "Content-Type: application/json",
    "Authorization: Bearer $token"
);
$postData = array(
    "name" => $name,
    "personal_phone" => $phone,
    "cf_data_de_nascimento" => $birthday,
    "cf_opt_in_newsletter" => "Sim",
    "cf_genero" => $gender
);
$curl = curl_init($endpoint);
curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'PATCH');
curl_setopt($curl, CURLOPT_HTTPHEADER, $postHeaders);
curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($postData));
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($curl);
echo json_encode(array("success" => true));
