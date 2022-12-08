<?php
header('Content-type:application/json;charset=utf-8');
header('Access-Control-Allow-Origin: *');
// Fluxo da API
$masterDataData = getMasterData();

echo $masterDataData;

// Função para pegar as imagens do master data da vtex
function getMasterData()
{
    $endpoint = "https://www.sestini.com.br/api/dataentities/IG/search?_fields=permalink%2Ccaption%2Cmedia_url%2Cmedia_type&&_sort=createdIn%20DESC";
    $postHeaders = array(
        'mode: no-cors',
        'Content-Type: application/json',
        'Accept: application/vnd.vtex.ds.v10+json',
        'REST-Range: resources=0-6',
        'X-VTEX-API-AppKey: vtexappkey-sestini-YNVWIB',
        'X-VTEX-API-AppToken: HALGJDIHUOXEHXMAQEQYASGZOFSNAOZKINOHUTEODRTKENMQEFNULGGPUMSEKVGGONVUIFFWZBUIZVUATBIVAEZCGZNIBADILMWRSRIZZRVJLXQYRRKIMKGKNSNJRXVZ'
    );

    $ch = curl_init($endpoint);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $postHeaders);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $data = curl_exec($ch);
    curl_close($ch);
    return $data;
}

