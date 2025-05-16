<?php
session_start();

if (isset($_SESSION['usuario'])) {
    echo json_encode([
        'success' => true,
        'nombre' => $_SESSION['usuario']['nombre'],
        'correo' => $_SESSION['usuario']['correo']
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'No hay sesión iniciada'
    ]);
}
?>
