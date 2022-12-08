<?php
require_once("tokens-vtex.php");
header('Content-Type: application/json');

// GLOBAL   
$productID = 2095;
$get_endpoint = "https://sestini.vtexcommercestable.com.br/api/catalog/pvt/product/$productID";
$update_endpoint = "https://sestini.vtexcommercestable.com.br/api/catalog/pvt/product/$productID";
$postHeaders = array(
    "X-VTEX-API-AppKey: $appKey",
    "X-VTEX-API-AppToken: $appToken",
    "Accept: application/json",
    "Content-Type: application/json"
);

// GET PRODUCT
$ch = curl_init($get_endpoint);
curl_setopt($ch, CURLOPT_HTTPHEADER, $postHeaders);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, 0);
$data = curl_exec($ch);
curl_close($ch);
$array_data = json_decode($data, true);
$postData = array(
    "Name" => $array_data['Name'],
    "DepartmentId" => $array_data['DepartmentId'],
    "CategoryId" => $array_data['CategoryId'],
    "BrandId" => $array_data['BrandId'],
    "LinkId" => $array_data['LinkId'],
    "RefId" => $array_data['RefId'],
    "IsVisible" => $array_data['IsVisible'],
    "Description" => $array_data['Description'],
    "DescriptionShort" => $array_data['DescriptionShort'],
    "ReleaseDate" => $array_data['ReleaseDate'],
    "KeyWords" => $array_data['KeyWords'],
    "Title" => $array_data['Title'],
    "IsActive" => true,
    "TaxCode" => $array_data['TaxCode'],
    "MetaTagDescription" => $array_data['MetaTagDescription'],
    "SupplierId" => $array_data['SupplierId'],
    "ShowWithoutStock" => $array_data['ShowWithoutStock'],
    "AdWordsRemarketingCode" => $array_data['AdWordsRemarketingCode'],
    "LomadeeCampaignCode" => $array_data['LomadeeCampaignCode'],
    "Score" => $array_data['Score']
);

print_r($postData);

// UPDATE TEXT LINK
// $curl = curl_init($update_endpoint);
// curl_setopt($curl, CURLOPT_POST, true);
// curl_setopt($curl, CURLOPT_HTTPHEADER, $postHeaders);
// curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($postData));
// curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
// curl_setopt($curl, CURLOPT_CUSTOMREQUEST,  'PUT');
// $data = curl_exec($curl);
// curl_close($curl);
// print_r($data);
// echo "<br>";
// // }
