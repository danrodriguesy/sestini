<?php
function getRefreshToken()
{
    $endpoint = "http://desenv.sestini.com.br/ecom/get-refresh-token-rd.php";
    $ch = curl_init($endpoint);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $data = curl_exec($ch);
    $array_data = json_decode($data, true);
    return $array_data['REFRESH_TOKEN'];
}

function saveRefreshToken($refresh_token)
{
    $endpoint = "http://desenv.sestini.com.br/ecom/save-refresh-token-rd.php?refresh_token=$refresh_token";
    $ch = curl_init($endpoint);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_exec($ch);
}

function getAccessToken()
{
    // GET Refresh Token
    $refresh_token = getRefreshToken();
    // Get new token
    $endpoint_token = "https://api.rd.services/auth/token";
    $tokenData = array(
        "client_id" => "4b381d13-3752-4b50-aebf-beb81484caeb",
        "client_secret" => "983a42765b5b4244a5c951c78d6263b9",
        "refresh_token" => "$refresh_token"
    );
    $curl = curl_init($endpoint_token);
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($curl, CURLOPT_HTTPHEADER, array("Content-Type: application/json"));
    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($tokenData));
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($curl);
    $token = json_decode($response, true)['access_token'];
    // Save updated refresh token
    $refresh_token_updated = json_decode($response, true)['refresh_token'];
    saveRefreshToken($refresh_token_updated);

    return $token;
}
