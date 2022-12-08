<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
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

// Get orders list
$select_orders_query = "SELECT TOP 150 ORDER_ID FROM IntegrationStatus WHERE INTEGRATED = 0";
$select_orders_stmt = $connection->prepare($select_orders_query);
$select_orders_stmt->execute();
$select_orders_result = $select_orders_stmt->fetchAll();
$log = array();
$items_log = array();

foreach ($select_orders_result as $order) {
    $getOrderId = $order['ORDER_ID'];
    // Get order data
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

    $array_data = json_decode($data, true);
    if ($array_data['status'] == 'invoiced' || $array_data['status'] == 'handling' || $array_data['status'] == 'ready for handling') {
        // Order data
        $orderId              = $array_data['orderId'];
        $sequence             = $array_data['sequence'];
        $sellerOrderId        = $array_data['sellerOrderId'];
        $salesChannel         = $array_data['salesChannel'];
        $status               = $array_data['status'];
        $statusDescription    = $array_data['statusDescription'];
        $value                = $array_data['value'];
        $creationDate         = $array_data['creationDate'];
        $lastChange           = $array_data['lastChange'];
        $orderGroup           = $array_data['orderGroup'];
        $totalItems           = $array_data['totals'][0]['value'];
        $totalDiscounts       = $array_data['totals'][1]['value'];
        $totalShipping        = $array_data['totals'][2]['value'];
        $totalTax             = $array_data['totals'][3]['value'];
        $email                = $array_data['clientProfileData']['email'];
        $firstName            = $array_data['clientProfileData']['firstName'];
        $lastName             = $array_data['clientProfileData']['lastName'];
        $phone                = $array_data['clientProfileData']['phone'];
        $userProfileId        = $array_data['clientProfileData']['userProfileId'];
        $coupon               = $array_data['marketingData']['coupon'];
        $postalCode           = $array_data['shippingData']['address']['postalCode'];
        $state                = $array_data['shippingData']['address']['state'];
        $city                 = $array_data['shippingData']['address']['city'];
        $country              = $array_data['shippingData']['address']['country'];
        $street               = $array_data['shippingData']['address']['street'];
        $number               = $array_data['shippingData']['address']['number'];
        $neighborhood         = $array_data['shippingData']['address']['neighborhood'];
        $complement           = $array_data['shippingData']['address']['complement'];
        $deliveryCompany      = $array_data['shippingData']['logisticsInfo'][0]['deliveryCompany'];
        $selectedSla          = $array_data['shippingData']['logisticsInfo'][0]['selectedSla'];
        $shippingEstimate     = $array_data['shippingData']['logisticsInfo'][0]['shippingEstimate'];
        $shippingEstimateDate = $array_data['shippingData']['logisticsInfo'][0]['shippingEstimateDate'];
        $paymentSystemName    = $array_data['paymentData']['transactions'][0]['payments'][0]['paymentSystemName'];
        $paymentValue         = $array_data['paymentData']['transactions'][0]['payments'][0]['value'];
        $paymentInstallments  = $array_data['paymentData']['transactions'][0]['payments'][0]['installments'];
        $itemsQuantity        = count($array_data['items']);

        $filteredOrderData = array(
            $orderId,
            $sequence,
            $sellerOrderId,
            $salesChannel,
            $status,
            $statusDescription,
            substr($value, 0, -2) . "." . substr($value, -2, 2),
            substr($creationDate, 0, 10) . " " . substr($creationDate, 11, 8),
            substr($lastChange, 0, 10) . " " . substr($lastChange, 11, 8),
            $orderGroup,
            substr($totalItems, 0, -2) . "." . substr($totalItems, -2, 2),
            substr($totalDiscounts, 0, -2) . "." . substr($totalDiscounts, -2, 2),
            substr($totalShipping, 0, -2) . "." . substr($totalShipping, -2, 2),
            substr($totalTax, 0, -2) . "." . substr($totalTax, -2, 2),
            $email,
            $firstName,
            $lastName,
            $phone,
            $userProfileId,
            $coupon,
            $postalCode,
            $country,
            $state,
            $city,
            $street,
            $number,
            $neighborhood,
            $complement,
            $deliveryCompany,
            $selectedSla,
            $shippingEstimate,
            substr($shippingEstimateDate, 0, 10) . " " . substr($shippingEstimateDate, 11, 8),
            $paymentSystemName,
            substr($paymentValue, 0, -2) . "." . substr($paymentValue, -2, 2),
            $paymentInstallments,
            $itemsQuantity
        );

        $insert_order_query = "INSERT INTO Orders (ORDER_ID, SEQUENCE, SELLER_ORDER_ID, SALLES_CHANNEL, STATUS,
                                        STATUS_DESCRIPTION, VALUE, CREATION_DATE, LAST_CHANGE, ORDER_GROUP,
                                        TOTAL_ITEMS, TOTAL_DISCOUNTS, TOTAL_SHIPPING, TOTAL_TAX, EMAIL,
                                        FIRST_NAME, LAST_NAME, PHONE, USER_PROFILE_ID, CUPOM,
                                        POSTAL_CODE, COUNTRY, STATE, CITY, STREET,
                                        NUMBER, NEIGHBORHOOD, COMPLEMENT, DELIVERY_COMPANY, DELIVERY_SLA,
                                        DELIVERY_ESTIMATE, DELIVERY_ESTIMATE_DATE, PAYMENT_SYSTEM_NAME, PAYMENT_VALUE, PAYMENT_INSTALLMENTS,
                                        ITEMS_QUANTITY)
                                VALUES (?, ?, ?, ?, ?,
                                        ?, ?, ?, ?, ?,
                                        ?, ?, ?, ?, ?,
                                        ?, ?, ?, ?, ?,
                                        ?, ?, ?, ?, ?,
                                        ?, ?, ?, ?, ?,
                                        ?, ?, ?, ?, ?,
                                        ?
                                    )";


        $insert_order_stmt = $connection->prepare($insert_order_query);
        if ($insert_order_stmt->execute($filteredOrderData)) {
            array_push($log, array($orderId => 'Integrated'));
            $orderIntegrated = true;
        } else {
            array_push($log, array($orderId => 'Error on Integration'));
        }

        // Items data
        foreach ($array_data['items'] as $item) {
            $array_item = array(
                $orderId,
                $item['productId'],
                $item['refId'],
                $item['name'],
                $item['ean'],
                substr($item['price'], 0, -2) . "." . substr($item['price'], -2, 2),
                substr($item['listPrice'], 0, -2) . "." . substr($item['listPrice'], -2, 2),
                '0',
                '0'
            );
            $insert_items_query = "INSERT INTO OrdersItems (ORDER_ID, ITEM_ID, REF_ID, NOME, EAN, PRICE, LIST_PRICE, CATEG, DEPART)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $insert_items_stmt = $connection->prepare($insert_items_query);
            if ($insert_items_stmt->execute($array_item)) {
                array_push($items_log, array($orderId => 'Items integrated'));
                $itemsIntegrated = true;
            } else {
                array_push($items_log, array($orderId => 'Items integration error'));
            }
        }

        if ($orderIntegrated && $itemsIntegrated) {
            $update_orderintegration_status_query = "UPDATE IntegrationStatus SET INTEGRATED = ?, INTEGRATION_DATE = ?, 
                                                        INTEGRATION_HOUR = ?, STATUS = ? WHERE ORDER_ID = ?";
            $update_orderintegration_status_stmt = $connection->prepare($update_orderintegration_status_query);
            $update_orderintegration_status_stmt->execute(array(1, date('Y-m-d'), date('H:i:s'), 'Integrated', $orderId));
        }
    } else {
        $orderId = $array_data['orderId'];
        if ($array_data['status'] == 'canceled' || $array_data['status'] == 'cancellation-requested') {
            $update_orderintegration_status_query = "UPDATE IntegrationStatus SET INTEGRATED = ?, INTEGRATION_DATE = ?, 
                                                        INTEGRATION_HOUR = ?, STATUS = ? WHERE ORDER_ID = ?";
            $update_orderintegration_status_stmt = $connection->prepare($update_orderintegration_status_query);
            $update_orderintegration_status_stmt->execute(array(2, date('Y-m-d'), date('H:i:s'), 'Canceled', $orderId));
        }
    }
}

$final_log = array("orderLog" => $log, "itemsLog" => $items_log);

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
$mail->FromName = "LOG - Orders Integration VTEX 2";
$mail->addAddress("r.francisco@sestini.com.br");
$mail->isHTML(true);
$mail->Subject = "LOG - Orders Integration VTEX 2";
$mail->Body = json_encode($final_log);
$mail->send();

print_r(json_encode($final_log));
