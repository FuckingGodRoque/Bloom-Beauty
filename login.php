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

// Conexión segura a base de datos
$conexion = new mysqli("localhost", "root", "", "bloom");

if ($conexion->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Error de conexión']);
    exit;
}

// Consulta preparada segura
$stmt = $conexion->prepare("SELECT nombre, correo FROM usuarios WHERE correo = ? AND contrasena = ?");
$stmt->bind_param("ss", $correo, $contrasena);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $usuario = $result->fetch_assoc();

    // Guardar sesión (opcional si no usas PHP en otras páginas)
    $_SESSION['usuario'] = $usuario['correo'];

    // Devolver datos para guardar en localStorage
    echo json_encode([
        'success' => true,
        'nombre' => $usuario['nombre'],
        'correo' => $usuario['correo']
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Credenciales incorrectas']);
}

$stmt->close();
$conexion->close();
?>
