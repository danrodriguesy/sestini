<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
// Upload Image
$name = $_FILES["file"]["name"];
$hash = rand(1111111111, 9999999999);
$hash .= $name;
$path = "./images/$hash";
move_uploaded_file($_FILES["file"]['tmp_name'], $path) . '<br>';

if($_GET['type'] == 'image_search'){
    $ch = curl_init("http://desenv.sestini.com.br/ecom/image-search/image-search.php?file=$hash");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $data = curl_exec($ch);
    curl_close($ch);
    echo $data;
}else{
    echo json_encode(array('file' => $hash));
}