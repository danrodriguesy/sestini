<?php
class Conexao
{
    public static function getConnection()
    {
        $pdoConfig  = "sqlsrv:Server=186.250.48.74,1444;Database=ECOM;";
        try {
            if (!isset($connection)) {
                $connection =  new PDO($pdoConfig, 'ecom', 'ec0m01');
                $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            }
            return $connection;
        } catch (PDOException $e) {
            $mensagem = "Drivers disponiveis: " . implode(",", PDO::getAvailableDrivers());
            $mensagem .= "\nErro: " . $e->getMessage();
            throw new Exception($mensagem);
        }
    }
}
