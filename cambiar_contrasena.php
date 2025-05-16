<?php
header('Content-Type: application/json');
include 'conexion.php';

$data = json_decode(file_get_contents('php://input'));

$correo = $data->correo;
$actual = $data->actual;
$nueva = $data->nueva;

// Verificar si la contraseña actual es correcta
$stmt = $conexion->prepare("SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?");
$stmt->bind_param("ss", $correo, $actual);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    // Actualizar la contraseña
    $stmtUpdate = $conexion->prepare("UPDATE usuarios SET contrasena = ? WHERE correo = ?");
    $stmtUpdate->bind_param("ss", $nueva, $correo);
    if ($stmtUpdate->execute()) {
        echo json_encode(['success' => true, 'message' => 'Contraseña actualizada correctamente.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al actualizar la contraseña.']);
    }
    $stmtUpdate->close();
} else {
    echo json_encode(['success' => false, 'message' => 'La contraseña actual es incorrecta.']);
}

$stmt->close();
$conexion->close();
?>
