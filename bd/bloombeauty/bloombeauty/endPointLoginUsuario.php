<?php
header('Access-Control-Allow-Origin: *'); // Permite solicitudes desde cualquier origen
header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); // Métodos permitidos
header('Access-Control-Allow-Headers: Content-Type'); // Encabezados permitidos
header('Content-Type: application/json'); // Tipo de contenido de la respuesta

// Si es una solicitud OPTIONS (preflight), termina aquí
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'dbManager.php';

// Obtener datos del cuerpo de la solicitud
$input = file_get_contents('php://input');
$datos = json_decode($input, true);

if (!$datos) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Datos JSON inválidos']);
    exit;
}

// Validar campos requeridos
if (empty($datos['correo']) || empty($datos['contrasena'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Correo y contraseña son requeridos']);
    exit;
}

try {
    $db = new dbManager();
    
    // Buscar usuario por correo
    $stmt = $db->ejecutarConsulta(
        "SELECT id, nombre, correo, contrasena FROM usuarios WHERE correo = :correo",
        [':correo' => $datos['correo']]
    );
    
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$usuario) {
        http_response_code(404);
        echo json_encode(['success' => false, 'error' => 'Usuario no encontrado']);
        exit;
    }
    
    // Verificar contraseña
    if (!password_verify($datos['contrasena'], $usuario['contrasena'])) {
        http_response_code(401);
        echo json_encode(['success' => false, 'error' => 'Contraseña incorrecta']);
        exit;
    }
    
    // Eliminar la contraseña del objeto de respuesta
    unset($usuario['contrasena']);
    
    // Iniciar sesión (opcional)
    session_start();
    $_SESSION['usuario'] = $usuario;
    
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Inicio de sesión exitoso',
        'usuario' => $usuario
    ]);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Error de base de datos: ' . $e->getMessage()]);
}
?>

<script>
async function iniciarSesion(event) {
    event.preventDefault();

    const correo = document.getElementById('loginCorreo').value;
    const contrasena = document.getElementById('loginContraseña').value;

    try {
        const response = await fetch('http://localhost/bloombeauty/endPointLoginUsuario.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ correo, contrasena }),
        });

        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
            // Guardar el usuario en sessionStorage
            sessionStorage.setItem('usuario', JSON.stringify(data.usuario));

            // Actualizar el menú con el nombre del usuario
            if (window.parent && window.parent.actualizarMenuUsuario) {
                window.parent.actualizarMenuUsuario(data.usuario.nombre);
            }

            // Cerrar todos los modales
            if (window.parent && window.parent.cerrarModal) {
                window.parent.cerrarModal();
            }

            // Recargar la página para reflejar los cambios
            window.parent.location.reload();
        } else {
            alert(data.error || 'Correo o contraseña incorrectos');
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Hubo un problema al iniciar sesión.');
    }
}
</script>