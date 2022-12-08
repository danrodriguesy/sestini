<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once "tokens-vtex.php";

$email             = filter_var($_GET['email'], FILTER_SANITIZE_STRING);
$document          = filter_var($_GET['document'], FILTER_SANITIZE_STRING);
$documentType      = "cpf";
$firstName         = filter_var($_GET['firstName'], FILTER_SANITIZE_STRING);
$lastName          = filter_var($_GET['lastName'], FILTER_SANITIZE_STRING);
$phone             = filter_var($_GET['phone'], FILTER_SANITIZE_STRING);
$birthDate         = filter_var($_GET['birthDate'], FILTER_SANITIZE_STRING);
$gender            = filter_var($_GET['gender'], FILTER_SANITIZE_STRING);
$isNewsletterOptIn = filter_var($_GET['isNewsletterOptIn'], FILTER_SANITIZE_STRING);

if ($email == '' || $document == '' || $firstName == '' || $lastName == '' || $phone == '' || $birthDate == '' || $gender == '' || $isNewsletterOptIn == '') {
    echo json_encode(["err" => true]);
    exit;
}

// Inicia a requisão para salvar os dados no master data
$endpoint = "https://www.sestini.com.br/api/dataentities/CL/documents";
$postData = array(
    "email"             => $email,
    "document"          => $document,
    "documentType"      => $documentType,
    "firstName"         => $firstName,
    "lastName"          => $lastName,
    "phone"             => $phone,
    "birthDate"         => $birthDate,
    "gender"            => $gender,
    "isNewsletterOptIn" => $isNewsletterOptIn == 'on' ? true : false,
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

print_r($response);
