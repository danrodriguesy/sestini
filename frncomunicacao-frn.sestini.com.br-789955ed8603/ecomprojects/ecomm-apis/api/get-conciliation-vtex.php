<?php
header('Content-Type: application/json');

clearstatcache();
ini_set('max_execution_time', 0);
ini_set("memory_limit", "-1");
require_once("../tokens-vtex.php");
require_once("../ecom-db-connection.php");
$connection = Conexao::getConnection();
$olistToken = getOlistToken($connection);

use PHPMailer\PHPMailer\PHPMailer;

require_once "../vendor/autoload.php";

// GET All Orders Params
$date         = date('Y-m-d');
$initial_date = date("Y-m-d", strtotime($date . "-5 days")) . "T00:00:00.000Z";
$final_date   = "$date" . "T23:59:59.999Z";
$allPages     = 999999;

// Initialize CSV File
$file = fopen("$date-CONCILIACAO-VTEX.csv", "w");
$fileHeaders = array(
    "Origem", "ID Pedido", "Codigo do Cliente", "Nome do Cliente", "CPF", "Valor", 
    "Data de faturamento", "Data de pagamento", "Metodo de pagamento", "Situacao", "TID (IUGU)",
    "(OLIST) Valor da NF", "(OLIST) Chave da NF", "(OLIST) Valor dos itens", "(OLIST) Comissao dos itens",
    "(OLIST) Taxa fixa", "(OLIST) Frete", "(OLIST) Desconto do Frete", "(OLIST) Data de pagamento",
    "(OLIST) Valor do pagamento", "(OLIST) ID do Pedido"
);
fputcsv($file, $fileHeaders);

// Initialize Orders Loop
for ($page = 1; $page <= $allPages; $page++) {
    // Request Orders Data
    $params     = "page=$page&f_creationDate=" . urlencode("creationDate:[$initial_date TO $final_date]");
    $array_data = getOrders($page, $initial_date, $final_date, $params, $appKey, $appToken);
    $orders     = $array_data['list'];
    $paging     = $array_data['paging'];

    // Save orders
    foreach ($orders as $order) {
        $getOrderId = $order['orderId'];
        $orderOrigin = substr($getOrderId, 0, 3);

        if ($order["paymentNames"] == "Boleto Bancário" || $orderOrigin == 'LST') {
            // Get Order Data
            $array_data = getVtexOrderData($getOrderId, $appKey, $appToken);

            if ($array_data['status'] == 'invoiced' || $array_data['status'] == 'handling' || $array_data['status'] == 'ready-for-handling') {
                $paymentSystemName = $array_data['paymentData']['transactions'][0]['payments'][0]['paymentSystemName'];
                $userProfileId     = $array_data['clientProfileData']['userProfileId'];
                $firstName         = $array_data['clientProfileData']['firstName'];
                $lastName          = $array_data['clientProfileData']['lastName'];
                $cpf               = $array_data['clientProfileData']['document'];
                $paymentValue      = $array_data['paymentData']['transactions'][0]['payments'][0]['value'];
                $transactionId     = $array_data['paymentData']['transactions'][0]['payments'][0]['tid'];
                $status            = $array_data['status'];
                $invoiceDate       = $array_data['invoicedDate'];
                $authorizedDate    = $array_data['authorizedDate'];
                $value             = substr($array_data['value'], 0, -2) . ',' . substr($array_data['value'], -2);

                switch ($orderOrigin) {
                    case 'LST':
                        $transactionOrigin = 'Olist';
                        break;
                    default:
                        $transactionOrigin = 'VTEX';
                        break;
                }

                if ($orderOrigin == 'LST') {
                    $olistOrderData = getOlistOrderData($olistToken, substr($getOrderId, 4));
                    $olistInvoiceValue        = $olistOrderData['total_invoice'];
                    $olistInvoiceKey          = $olistOrderData['invoiceKey'];
                    $olistItemsValue          = $olistOrderData['total_items'];
                    $olistItemsComission      = $olistOrderData['total_items'];
                    $olistFlatFee             = $olistOrderData['total_flat_fee'];
                    $olistFlatFreight         = $olistOrderData['total_flat_freight'];
                    $olistFlatFreightDiscount = $olistOrderData['total_flat_freight_discount'];
                    $olistApprovedDate        = $olistOrderData['approved_at'];
                    $olistPaymentValue        = $olistOrderData['payment_methods'][0]['value'];
                    $olistOrderId             = substr($getOrderId, 4);
                }else{
                    $olistInvoiceValue        = "";
                    $olistInvoiceKey          = "";
                    $olistItemsValue          = "";
                    $olistItemsComission      = "";
                    $olistFlatFee             = "";
                    $olistFlatFreight         = "";
                    $olistFlatFreightDiscount = "";
                    $olistApprovedDate        = "";
                    $olistPaymentValue        = "";
                    $olistOrderId             = "";
                }

                $data = array(
                    "Origem"                     => $transactionOrigin,
                    "ID Pedido"                  => $getOrderId,
                    "Codigo do Cliente"          => $userProfileId,
                    "Nome do Cliente"            => "$firstName $lastName",
                    "CPF"                        => $cpf,
                    "Valor"                      => $value,
                    "Data de faturamento"        => substr($invoiceDate, 0, 10),
                    "Data de pagamento"          => substr($authorizedDate, 0, 10),
                    "Metodo de pagamento"        => $paymentSystemName,
                    "Situacao"                   => $status,
                    "TID (IUGU)"                 => $transactionId,
                    "(OLIST) Valor da NF"        => $olistInvoiceValue,
                    "(OLIST) Chave da NF"        => $olistInvoiceKey,
                    "(OLIST) Valor dos itens"    => $olistItemsValue,
                    "(OLIST) Comissao dos itens" => $olistItemsComission,
                    "(OLIST) Taxa fixa"          => $olistFlatFee,
                    "(OLIST) Frete"              => $olistFlatFreight,
                    "(OLIST) Desconto do Frete"  => $olistFlatFreightDiscount,
                    "(OLIST) Data de pagamento"  => $olistApprovedDate,
                    "(OLIST) Valor do pagamento" => $olistPaymentValue,
                    "(OLIST) ID do Pedido"       => $olistOrderId,
                );
                fputcsv($file, $data);
            }
        }
    }
    if ($page == 1) $allPages = $paging['pages'];
}

// Send email
$mail = new PHPMailer(true);
$mail->isSMTP();
$mail->Host = "mail.sestinidocs.com.br";
$mail->SMTPAuth = true;
$mail->Username = "servicos@sestinidocs.com.br";
$mail->Password = "Prime20#$!@";
$mail->SMTPSecure = "tls";
$mail->SMTPDebug = 0;
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
$mail->FromName = "CONCILIAÇÃO VTEX";
$mail->addAddress("m.feitosa@sestini.com.br");
$mail->addAddress("d.garcia@sestini.com.br");
$mail->AddAddress("r.francisco@sestini.com.br");
$mail->Subject = "CONCILIAÇÃO VTEX";
$mail->addAttachment("$date-CONCILIACAO-VTEX.csv");
$mail->Body = "Segue anexo, arquivo para download.";
$mail->send();
// echo $mail->send();
// print_r($mail->ErrorInfo);


// Functions
function getOrders($page, $initial_date, $final_date, $params, $appKey, $appToken)
{
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
    return json_decode($data, true);
}

function getVtexOrderData($getOrderId, $appKey, $appToken)
{
    $endpoint = "https://sestini.vtexcommercestable.com.br/api/oms/pvt/orders/$getOrderId";
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
    return json_decode($data, true);
}

function getOlistRefreshToken($connection)
{
    $select_refresh_query = "SELECT TOP 150 REFRESH_TOKEN FROM OlistIntegrationToken WHERE REFRESH_TOKEN != '' ORDER BY ID DESC";
    $select_refresh_stmt = $connection->prepare($select_refresh_query);
    $select_refresh_stmt->execute();
    $select_refresh_result = $select_refresh_stmt->fetchAll();
    return $select_refresh_result[0]['REFRESH_TOKEN'];
}

function saveOlistRefreshToken($connection, $newRefreshToken)
{
    $insert_refresh_query = "INSERT INTO OlistIntegrationToken (REFRESH_TOKEN) VALUES (?)";
    $stmt = $connection->prepare($insert_refresh_query);
    $stmt->execute(array($newRefreshToken));
    return true;
}

function getOlistToken($connection)
{
    $refresh_token = getOlistRefreshToken($connection);
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://id.olist.com/openid/token',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => "client_id=sestini&client_secret=UxGlpRk60WtXjYds2uqX6yK6Vpzpgpzr_BaUbM_BwnE&refresh_token=$refresh_token&grant_type=refresh_token",
        CURLOPT_HTTPHEADER => array(
            'Content-Type: application/x-www-form-urlencoded',
            'Cookie: csrftoken=i5022pAd6ux0h6homZ1dvYCCMUtsFiZvraJ6YxPIbSGli8DziubyNBlVpWnq5Unh'
        ),
    ));
    $response = curl_exec($curl);
    $response = json_decode($response, true);
    curl_close($curl);

    $idToken = $response['id_token'];
    $new_refresh_token = $response['refresh_token'];
    // Save new refresh token in database
    saveOlistRefreshToken($connection, $new_refresh_token);

    return $idToken;
}

function getOlistOrderData($olistToken, $orderId)
{
    $endpoint = "https://partners-api.olist.com/v1/seller-orders/$orderId";
    $postHeaders = array(
        "Authorization: JWT $olistToken",
        "Accept: application/json"
    );
    $ch = curl_init($endpoint);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $postHeaders);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $data = curl_exec($ch);
    curl_close($ch);
    return json_decode($data, true);
}
