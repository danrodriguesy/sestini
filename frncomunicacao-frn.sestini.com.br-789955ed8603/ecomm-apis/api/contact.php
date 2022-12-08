<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require_once "vendor/autoload.php";

$email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
$username = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
$cpf = filter_var($_POST['cpf'], FILTER_SANITIZE_STRING);
$usermessage = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
$cellphone = filter_var($_POST['cellphone'], FILTER_SANITIZE_STRING);
$filesLength = filter_var($_POST['filesLength'], FILTER_SANITIZE_NUMBER_INT);
$date = date('d/m/Y H:i:s');

if ($email == '' || $username == '' || $cpf == '' || $usermessage == '' || $cellphone == '') {
    echo json_encode(array("err" => true));
    exit;
}

$attachs = "";
for ($i = 0; $i < $filesLength; $i++) {
    $name = $_FILES["file_$i"]["name"];
    $ano = date("Y");
    $hora = date("m");
    $dia = date("d");
    $hash = random_int(10000000000000000000, 9999999999999999999999);
    $hash .= $name;
    $path = "./attachments/$hash";
    echo move_uploaded_file($_FILES["file_$i"]['tmp_name'], $path) . '<br>';
    $attachs .= "<a href='http://sestinidocs.com.br/links/sestini/ecomm-api/attachments/$hash'>$hash</a> <br>";
}

$message = "
    O cliente $username entrou em contato conosco via E-commerce:
    <br>
    <br>
    Nome: $username
    <br>
    E-mail: $email
    <br>
    CPF: $cpf
    <br>
    Telefone: $cellphone
    <br>
    Mensagem: $usermessage
    <br>
    <br>
    Anexos:
    $attachs
";

$mail = new PHPMailer(true);
$mail->isSMTP();
//Set SMTP host name                          
$mail->Host = "mail.sestinidocs.com.br";
$mail->SMTPAuth = true;
$mail->Username = "servicos@sestinidocs.com.br";
$mail->Password = "Prime20#$!@";
$mail->SMTPSecure = "tls";
$mail->Port = 587;
$mail->SMTPOptions = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
);
$mail->CharSet = 'UTF-8';
$mail->From = "servicos@sestinidocs.com.br";
$mail->FromName = "$username - $date - Formulário de contato E-commerce - Sestini";
$mail->addAddress("garantia@sestini.com.br", "SAC E-commerce");
$mail->AddBCC("r.francisco@sestini.com.br", "Raí Soares");
$mail->isHTML(true);
$mail->Subject = "$username - $date - Contato E-commerce - SESTINI";
$mail->Body = "$message";

try {
    $mail->send();
    echo json_encode(array("err" => false));
} catch (Exception $e) {
    echo json_encode(array("err" => true));
}
