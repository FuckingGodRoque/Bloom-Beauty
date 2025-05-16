<?php
// registroUsuario.php

header('Content-Type: application/json');

// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bloom";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Error de conexión a la base de datos"]);
    exit;
}

// Leer JSON recibido
$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['nombre'], $input['correo'], $input['contrasena'])) {
    http_response_code(400);
    echo json_encode(["error" => "Faltan datos"]);
    exit;
}

$nombre = $input['nombre'];
$correo = $input['correo'];
$contrasena = $input['contrasena']; // Puedes aplicar hash aquí si deseas mayor seguridad

// Verificar si el correo ya existe
$check = $conn->prepare("SELECT id FROM usuarios WHERE correo = ?");
$check->bind_param("s", $correo);
$check->execute();
$check->store_result();

if ($check->num_rows > 0) {
    echo json_encode(["error" => "El correo ya está registrado"]);
    $check->close();
    $conn->close();
    exit;
}
$check->close();

// Insertar nuevo usuario
$stmt = $conn->prepare("INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $nombre, $correo, $contrasena);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Error al registrar el usuario"]);
}

$stmt->close();
$conn->close();
?>