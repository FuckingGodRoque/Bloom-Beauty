<?php
class dbManager {
    private $pdo;

    public function __construct() {
        $host = 'localhost';
        $dbname = 'bloombeauty';
        $username = 'root'; // Cambia esto si usas otro usuario
        $password = ''; // Cambia esto si tienes una contraseña configurada

        try {
            $this->pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die('Error de conexión: ' . $e->getMessage());
        }
    }

    public function ejecutarConsulta($sql, $params = []) {
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt;
    }

    public function obtenerConexion() {
        return $this->pdo;
    }

    public function cerrarConexion() {
        $this->pdo = null;
    }
}
?>