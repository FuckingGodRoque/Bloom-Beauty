<?php
// Permitir solicitudes desde el origen de tu aplicación
header("Access-Control-Allow-Origin: http://127.0.0.1:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// Manejar solicitud OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Solo continuar para métodos POST
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Método no permitido']);
    exit;
}

// Obtener el contenido JSON
$input = file_get_contents('php://input');
$datos = json_decode($input, true);

if (!$datos) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Datos JSON inválidos']);
    exit;
}

// Validar campos requeridos
$camposRequeridos = ['nombre', 'correo', 'contrasena'];
foreach ($camposRequeridos as $campo) {
    if (empty($datos[$campo])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => "El campo $campo es requerido"]);
        exit;
    }
}

// Validar formato de correo
if (!filter_var($datos['correo'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Formato de correo inválido']);
    exit;
}

// Conectar a la base de datos (ejemplo con PDO)
try {
    require_once 'dbManager.php';
    $db = new dbManager();
    
    // Verificar si el correo ya existe
    $stmt = $db->ejecutarConsulta("SELECT id FROM usuarios WHERE correo = :correo", [':correo' => $datos['correo']]);
    if ($stmt->fetch()) {
        http_response_code(409);
        echo json_encode(['success' => false, 'error' => 'El correo ya está registrado']);
        exit;
    }
    
    // Hashear la contraseña
    $hash = password_hash($datos['contrasena'], PASSWORD_DEFAULT);
    
    // Insertar nuevo usuario
    $sql = "INSERT INTO usuarios (nombre, correo, contrasena) VALUES (:nombre, :correo, :contrasena)";
    $params = [
        ':nombre' => $datos['nombre'],
        ':correo' => $datos['correo'],
        ':contrasena' => $hash
    ];
    
    $resultado = $db->ejecutarConsulta($sql, $params);
    
    if ($resultado->rowCount() > 0) {
        http_response_code(201);
        echo json_encode([
            'success' => true,
            'message' => 'Usuario registrado exitosamente',
            'usuario' => [
                'nombre' => $datos['nombre'],
                'correo' => $datos['correo']
            ]
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Error al registrar usuario']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Error de base de datos: ' . $e->getMessage()]);
}
?>