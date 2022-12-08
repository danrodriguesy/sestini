<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once("get-rd-token-functions.php");

$email             = filter_var($_POST['email'], FILTER_SANITIZE_STRING);
$gender            = filter_var($_POST['gender'], FILTER_SANITIZE_STRING);
$birthday          = filter_var($_POST['birthday'], FILTER_SANITIZE_STRING);
$favoriteMalas     = filter_var($_POST['favoriteMalas'], FILTER_SANITIZE_STRING);
$favoriteInfantil  = filter_var($_POST['favoriteInfantil'], FILTER_SANITIZE_STRING);
$favoriteJuvenil   = filter_var($_POST['favoriteJuvenil'], FILTER_SANITIZE_STRING);
$favoriteExecutivo = filter_var($_POST['favoriteExecutivo'], FILTER_SANITIZE_STRING);
$favoriteDiaDia    = filter_var($_POST['favoriteDiaDia'], FILTER_SANITIZE_STRING);
$filhos            = filter_var($_POST['filhos'], FILTER_SANITIZE_STRING);
$uf                = filter_var($_POST['uf'], FILTER_SANITIZE_STRING);
$city              = filter_var($_POST['city'], FILTER_SANITIZE_STRING);
$phone             = filter_var($_POST['phone'], FILTER_SANITIZE_STRING);

if ($birthday == '') {
    echo json_encode(array("success" => false));
    exit;
}

$token = getAccessToken();

// Update user
$endpoint = "https://api.rd.services/platform/contacts/email:$email";
$postHeaders = array(
    "Content-Type: application/json",
    "Authorization: Bearer $token"
);
$postData = array(
    "personal_phone" => $phone,
    "cf_data_de_nascimento" => $birthday,
    "cf_opt_in_newsletter" => "Sim",
    "cf_genero" => $gender,
    "cf_cf_favorite_products" => "$favoriteMalas, $favoriteJuvenil, $favoriteInfantil, $favoriteExecutivo, $favoriteDiaDia",
    "state" => $uf,
    "city" => $city,
);

$curl = curl_init($endpoint);
curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'PATCH');
curl_setopt($curl, CURLOPT_HTTPHEADER, $postHeaders);
curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($postData));
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($curl);
echo json_encode(array("success" => true));
