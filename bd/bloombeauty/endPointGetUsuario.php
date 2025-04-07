<?php
header('Content-Type: application/json');
require_once 'dbManager.php';

$db = new DBManager();

try {
    $sql = "SELECT id, nombre, correo FROM usuarios";
    $stmt = $db->ejecutarConsulta($sql);
    $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($usuarios);
    
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al obtener usuarios: ' . $e->getMessage()]);
}
?>