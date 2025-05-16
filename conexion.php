<?php
// Parámetros de conexión
$servidor = "localhost";
$usuario = "root";
$contrasena = ""; // Deja vacío si no usas contraseña en tu MySQL
$basededatos = "bloom"; // Asegúrate que este nombre sea correcto

// Crear conexión
$conexion = new mysqli($servidor, $usuario, $contrasena, $basededatos);

// Verificar conexión
if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}
?>
