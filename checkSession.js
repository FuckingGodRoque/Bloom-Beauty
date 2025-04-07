document.addEventListener('DOMContentLoaded', () => {
    const usuario = JSON.parse(sessionStorage.getItem('usuario'));
    
    if (!usuario) {
        // Redirigir a login si no hay sesión
        window.location.href = 'login.html';
    } else {
        // Mostrar información del usuario
        const nombreUsuarioElement = document.getElementById('nombreUsuario');
        if (nombreUsuarioElement) {
            nombreUsuarioElement.textContent = usuario.nombre;
        }
    }
});

// Para cerrar sesión
function cerrarSesion() {
    sessionStorage.removeItem('usuario');
    window.location.href = 'login.html';
}