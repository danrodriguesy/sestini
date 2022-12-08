<?php
header('Content-Type: application/json');
ini_set('max_execution_time', 0);
ini_set("memory_limit", "-1");
require_once("tokens-vtex.php");
require_once("ecom-db-connection.php");
$connection = Conexao::getConnection();

// Select items
$select_orders_items_query = "SELECT TOP 50 ITEM_ID FROM OrdersItems WHERE DEPART = '0'";
$select_orders_items_stmt = $connection->prepare($select_orders_items_query);
$select_orders_items_stmt->execute();
$result = $select_orders_items_stmt->fetchAll();
foreach ($result as $item) {
    $itemId = $item[0];
    // Get item category and department ID data
    $endpoint = "https://sestini.vtexcommercestable.com.br/api/catalog/pvt/product/$itemId";
    $postHeaders = array(
        "X-VTEX-API-AppKey: $appKey",
        "X-VTEX-API-AppToken: $appToken"
    );
    $ch = curl_init($endpoint);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $postHeaders);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $data = curl_exec($ch);
    $array_data = json_decode($data, true);

    // Data
    $departmentId = $array_data['DepartmentId'];
    $categoryId   = $array_data['CategoryId'];

    // GET Department Name
    $endpoint = "https://sestini.vtexcommercestable.com.br/api/catalog/pvt/category/$departmentId";
    $postHeaders = array(
        "X-VTEX-API-AppKey: $appKey",
        "X-VTEX-API-AppToken: $appToken"
    );
    $ch = curl_init($endpoint);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $postHeaders);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $data = curl_exec($ch);
    $array_data = json_decode($data, true);
    $departmentName = $array_data['Name'];

    // GET Category Name
    $endpoint = "https://sestini.vtexcommercestable.com.br/api/catalog/pvt/category/$categoryId";
    $postHeaders = array(
        "X-VTEX-API-AppKey: $appKey",
        "X-VTEX-API-AppToken: $appToken"
    );
    $ch = curl_init($endpoint);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $postHeaders);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $data = curl_exec($ch);
    $array_data = json_decode($data, true);
    $categoryName = $array_data['Name'];

    $update_orderitems_categories_query = "UPDATE OrdersItems SET DEPART = ?, CATEG = ? WHERE ITEM_ID = ?";
    $update_orderitems_categories_stmt = $connection->prepare($update_orderitems_categories_query);
    $update_orderitems_categories_stmt->execute(array($departmentName, $categoryName, $itemId));
}
