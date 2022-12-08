<?php
header('Content-Type: application/json');
ini_set('max_execution_time', 0);
ini_set("memory_limit", "-1");
require_once("tokens-vtex.php");
require_once("ecom-db-connection.php");
$connection = Conexao::getConnection();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require_once "vendor/autoload.php";

// GET em todos os pedidos
$date         = date('Y-m-d');
$initial_date = date("Y-m-d", strtotime($date . "-1 month")) . "T00:00:00.000Z";
$final_date   = "$date" . "T23:59:59.999Z";
$allPages     = 999999;
$log = array();
for ($page = 1; $page <= $allPages; $page++) {
    $params      = "page=$page&f_creationDate=" . urlencode("creationDate:[$initial_date TO $final_date]");
    $endpoint    = "https://sestini.vtexcommercestable.com.br/api/oms/pvt/orders?$params";
    $postHeaders = array(
        "X-VTEX-API-AppKey: $appKey",
        "X-VTEX-API-AppToken: $appToken"
    );
    $ch = curl_init($endpoint);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $postHeaders);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $data = curl_exec($ch);
    curl_close($ch);

    // Request data
    $array_data = json_decode($data, true);
    $orders     = $array_data['list'];
    $paging     = $array_data['paging'];

    // Save orders
    foreach ($orders as $order) {
        $orderId = $order['orderId'];
        // Verify if order is integrated
        $verify_query = "SELECT ORDER_ID FROM IntegrationStatus WHERE ORDER_ID = ?";
        $verify_stmt = $connection->prepare($verify_query);
        $verify_query_params = array($order['orderId']);
        $verify_stmt->execute($verify_query_params);
        $verify_result = $verify_stmt->fetchAll();

        if (count($verify_result) == 0) {
            // Insert order
            try {
                $query = "INSERT INTO IntegrationStatus (ORDER_ID, INTEGRATED, STATUS) VALUES (?, ?, ?)";
                $stmt = $connection->prepare($query);
                $params = array($orderId, '0', 'Not integrated');
                $stmt->execute($params);
                array_push($log, array($orderId => 'Will be integrated'));
            } catch (\Throwable $th) {
                array_push($log, array($orderId => 'Integration ERROR'));
            }
        } else {
            array_push($log, array($orderId => 'Integrated'));
        }
    }
    if ($page == 1) $allPages = $paging['pages'];
}

$mail = new PHPMailer(true);
$mail->isSMTP();
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
$mail->FromName = "LOG - Orders Integration VTEX";
$mail->addAddress("r.francisco@sestini.com.br");
$mail->isHTML(true);
$mail->Subject = "LOG - Orders Integration VTEX";
$mail->Body = json_encode($log);
$mail->send();

print_r(json_encode($log));
