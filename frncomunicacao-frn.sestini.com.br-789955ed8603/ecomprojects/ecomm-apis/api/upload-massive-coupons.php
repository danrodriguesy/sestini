<?PHP
// UPLOAD TO WEBSERVER ONLY WHEN YOU WILL USE
require_once "tokens-vtex.php";

$coupon_list = array(
    'Tatiane20',
    'Lorrani20',
    'Andreza20',
    'Cristiane20',
    'Yasmin20',
    'Marise20',
    'Rebeka20',
    'Francielen20',
    'AndressaG20',
    'Alessandra20',
    'Talita20',
    'Adna20',
    'Roberta20',
    'AnaClivia20',
    'Camila20',
    'Diana20',
    'Talita20',
    'Tatiana20',
    'Carla20',
    'Rosana20',
    'Carolina20',
    'Jucilene20',
    'Cesar20',
);

foreach ($coupon_list as $couponName) {
    echo $couponName . "<br>";
    $endpoint = "rnb.vtexcommercestable.com.br/api/rnb/pvt/coupon?an=sestini";
    $postData = array(
        "utmSource" => "franquias_lojas",
        "UtmCampaign" => "franquias_lojas",
        "CouponCode" => $couponName,
        "IsArchived" => false,
        "MaxItemsPerClient" => 99,
        "ExpirationIntervalPerUse" => "00:00:00"
    );

    $postHeaders = array(
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
}
// {
//     "utmSource": "franquias_lojas",
//     "UtmCampaign": "franquias_lojas",
//     "CouponCode": $couponName,
//     "IsArchived": false,
//     "MaxItemsPerClient": 99, 
//     "ExpirationIntervalPerUse": "00:00:00"
// }