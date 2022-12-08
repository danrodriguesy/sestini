<?php
// Variaveis do instagram -> Passo a passo para gerar long live token comentado no final do código.
$longLiveToken = 'IGQVJXY1k3dHdqTWRtR3dMY1kxSWFaX2dNTy1RWUJ3VGJ1MHdVY01oRXczdjVtaWZAsSTZAqc0dYMFpHcGxZAQkhCUlZA5SHdOVUhMUGJZAZAF9fdWtlVkhtaTlSckVEeF9tRkstS2RhZAjdR';
$fields = 'id,username,caption,media_type,media_url,permalink,thumbnail_url,profile_picture';
$userId = '17841402007963547';

// Fluxo da API
$instagramData = getInstagramImages($fields, $longLiveToken, $userId);

saveInstagramImages($instagramData);

// Função para pegar as imagens do feed do instagram
function getInstagramImages($fields, $token, $userId)
{
    $endpoint = "https://graph.instagram.com/$userId/media?fields=$fields&access_token=$token";
    $ch = curl_init($endpoint);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $data = curl_exec($ch);
    curl_close($ch);
    return $data;
}

// Função para salvar imagens no Master Data da VTEX -> Salva as 6 primeiras imagens
function saveInstagramImages($data)
{
    $endpoint = "https://www.sestini.com.br/api/dataentities/IG/documents";
    for ($i = 0; $i <= 5; $i++) {
        $dataArray = json_decode($data, true);
        $item = $dataArray["data"][$i];

        // Variáveis para postData
        $permalink = $item["permalink"];
        $caption = $item["caption"];
        $media_url = $item["media_url"];
        $media_type = $item["media_type"];

        $postData = array(
            "permalink"  => $permalink,
            "caption"    => $caption,
            "media_url"  => $media_url,
            "media_type" => $media_type,
        );

        $postHeaders = array(
            "Accept: application/vnd.vtex.ds.v10+json",
            "Content-Type: application/json",
        );

        // Faz a Request
        $curl = curl_init($endpoint);
        curl_setopt($curl, CURLOPT_URL, $endpoint);
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, $postHeaders);
        curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($postData));
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        $response = curl_exec($curl);
        curl_close($curl);

        print_r($response);
        echo "<br>";
    }
}


/*
GENERATE NEW TOKEN

APP ID: 806391776588829
APP SECRET: 2439c69c186583a64fa52c2c99ab3250
CODE: AQBG59GGQO684q6M-ii4-YKht_lcIEYSDuTo3uZyBukgn0kYKEBKhMcNnHmdU-qffJDmB-cp3G5B0lf0FXRTBj06_4eyBEkY8cWCY7nPer2NuxRxUIA_iFnsQA4N8BU3pvkzf7mLsnbUulR-pdtXhyoPU2vY1pCxnBbIXxFK0Gnwnv-H5ewhJ3HE7V22JUp61NRDrVUHusjcGhRWzNb-vgEI0e0Zs0-DdQF8QuNwWDyRrg
1 - Construct the Authorization Window URL below, replacing {app-id} with your Instagram app’s ID
    https://api.instagram.com/oauth/authorize
    ?client_id={app-id}
    &redirect_uri={redirect-uri}
    &scope=user_profile,user_media
    &response_type=code

2 - Authenticate your Instagram test user by signing into the Authorization Window, then click Authorize to grant your app access to your profile data. Upon success, the page will redirect you to the redirect URI you included in the previous step and append an Authorization Code. For example:
    https://socialsizzle.herokuapp.com/auth/?code=AQDp3TtBQQ...#_
    Note that #_ has been appended to the end of the redirect URI, but it is not part of the code itself. Copy the code (without the #_ portion) so you can use it in the next step.

3 - Open your command line tool or app that supports cURL requests and send the following POST request to the API.

    curl -X POST \
    https://api.instagram.com/oauth/access_token \
    -F client_id={app-id} \
    -F client_secret={app-secret} \
    -F grant_type=authorization_code \
    -F redirect_uri={redirect-uri} \
    -F code={code}

4 - get response = IGQVJYLTFlS01NRmJId0N2akpkV3BvdlZA4ZAUF5MlNLZAldtOGQ5T1BRTV9NUFBkTUlwWFc4RHRGbHdzMVRoUFN6LU9ndmtHdHliN0R1RFZAYbm01bTVoeDJUN3RnV3FJT0xZAVEZAxSXhrajNva18wejBIdGZAIbEZA2d090M3BR
this is access token for api
*/