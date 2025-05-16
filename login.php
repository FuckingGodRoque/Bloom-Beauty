<?php
session_start();
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'));

if (!$input || !isset($input->correo) || !isset($input->contrasena)) {
    echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
    exit;
}

$correo = $input->correo;
$contrasena = $input->contrasena;

// Conexión a base de datos
$conexion = new mysqli("localhost", "root", "", "bloom"); // ajusta nombre de tu base si es otro

if ($conexion->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Error de conexión']);
    exit;
}

// Buscar al usuario
$stmt = $conexion->prepare("SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?");
$stmt->bind_param("ss", $correo, $contrasena);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $usuario = $result->fetch_assoc();
    $_SESSION['usuario'] = $usuario['correo']; // Puedes guardar más si quieres

    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Credenciales incorrectas']);
}

$stmt->close();
$conexion->close();
