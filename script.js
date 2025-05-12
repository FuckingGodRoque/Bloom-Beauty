document.addEventListener("DOMContentLoaded", function () {
    const verMasBtn = document.getElementById("ver-mas");
    const productos = document.querySelectorAll("#productos-container .producto");
    const btnMenu = document.getElementById("btn-menu");
    const userMenu = document.getElementById("user-menu");
    const menuContainer = document.getElementById("menu-container");
    const usernameSpan = document.getElementById("username");
    const btnPerfil = document.getElementById("btn-perfil");
    let modal = null; // Variable para almacenar el modal

    // Mostrar solo los primeros 8 productos inicialmente
    productos.forEach((producto, index) => {
        if (index >= 8) {
            producto.classList.add("hidden");
        }
    });

    // Evento para mostrar más productos
    verMasBtn.addEventListener("click", function () {
        productos.forEach((producto, index) => {
            if (index >= 8 && index < 16) { // Mostrar los siguientes 8 productos
                producto.classList.remove("hidden");
            }
        });

        // Ocultar el botón "Ver más" después de mostrar todos los productos
        if (document.querySelectorAll("#productos-container .hidden").length === 0) {
            verMasBtn.style.display = "none";
        }
    });

    const searchIcon = document.getElementById("search-icon");
    const searchBar = document.getElementById("search-bar");

    // Evento para alternar la barra de búsqueda
    searchIcon.addEventListener("click", function (event) {
        event.stopPropagation(); // Evita que el clic se propague
        searchBar.classList.toggle("active");

        // Enfocar la barra de búsqueda si está activa
        if (searchBar.classList.contains("active")) {
            searchBar.focus();
        }
    });

    // Cierra la barra de búsqueda si se hace clic fuera de ella
    document.addEventListener("click", function (event) {
        if (!searchBar.contains(event.target) && !searchIcon.contains(event.target)) {
            searchBar.classList.remove("active");
        }
    });

    const btnCarrito = document.getElementById("btn-carrito");

    // Abrir carrito.html en una nueva pestaña
    btnCarrito.addEventListener("click", function () {
        window.open("carrito.html", "_blank");
    });
    
    // Función para cerrar el modal
    function cerrarModal() {
        console.log("Intentando cerrar el modal...");
        if (modal) {
            modal.remove(); // Elimina el modal del DOM
            modal = null; // Reinicia la variable para evitar referencias a modales antiguos
            console.log("Modal cerrado correctamente.");
        } else {
            console.log("No hay modal abierto.");
        }
    }
    document.addEventListener("DOMContentLoaded", function() {
        // ... (tu código existente)
        
        // Verificar sesión al cargar
        const usuario = JSON.parse(sessionStorage.getItem('usuario'));
        if (usuario && usuario.nombre) {
            actualizarMenuUsuario(usuario.nombre);
        }
    });

    fetch("menu.html")
    .then(response => response.text())
    .then(data => {
        menuContainer.innerHTML = data;

        // Obtener el menú lateral después de cargarlo
        const menuLateral = document.getElementById("menuLateral");

        // Verificar si hay usuario logueado
        const usuario = JSON.parse(sessionStorage.getItem('usuario'));
        const usernameSpan = document.getElementById('username');
        if (usuario && usuario.nombre && usernameSpan) {
            usernameSpan.textContent = usuario.nombre;
        }

        // ... (resto de tu código para manejar el menú)
    })
    .catch(error => console.error("Error al cargar el menú:", error));

    function actualizarMenuUsuario(nombre) {
        const usernameSpan = document.getElementById('username');
        if (usernameSpan) {
            usernameSpan.textContent = nombre;
        }

        // Guardar también en sessionStorage por si se recarga la página
        const usuario = JSON.parse(sessionStorage.getItem('usuario') || '{}');
        usuario.nombre = nombre;
        sessionStorage.setItem('usuario', JSON.stringify(usuario));
    }


    // Función para abrir un modal
    function abrirModal(url) {
        cerrarModal(); // Cierra cualquier modal existente antes de abrir uno nuevo

        modal = document.createElement("div");
        modal.id = "modal";
        modal.innerHTML = `
            <div class="modal-content">
                <span class="cerrar" onclick="cerrarModal()">&times;</span>
                <iframe src="${url}" frameborder="0" style="width:100%;height:100%;"></iframe>
            </div>
        `;
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        `;
        document.body.appendChild(modal);

        // Ajustar el tamaño del iframe dinámicamente
        const iframe = modal.querySelector("iframe");
        iframe.onload = function () {
            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            const iframeHeight = iframeDocument.body.scrollHeight;
            iframe.style.height = `${iframeHeight}px`;
        };
    }

    // Abrir el modal de login al hacer clic en el botón de perfil
    btnPerfil.addEventListener("click", function () {
        abrirModal("Login.html");

    });

    

    // Cargar el menú lateral desde menu.html
    document.addEventListener("DOMContentLoaded", function() {
        const btnMenu = document.getElementById("btn-menu");
        const menuContainer = document.getElementById("menu-container");
    
        fetch("menu.html")
            .then(response => response.text())
            .then(data => {
                menuContainer.innerHTML = data;
                const menuLateral = document.getElementById("menuLateral");
    
                // Mostrar/Ocultar el menú
                btnMenu.addEventListener("click", function() {
                    menuLateral.classList.toggle("abierto");
                });
    
                // Cargar nombre de usuario
                const usuario = JSON.parse(sessionStorage.getItem('usuario'));
                const usernameElement = document.getElementById('username');
                const logoutBtn = document.getElementById('logoutBtn');
                
                if (usuario && usuario.nombre) {
                    usernameElement.textContent = usuario.nombre;
    
                    logoutBtn.addEventListener('click', function(e) {
                        e.preventDefault();
                        sessionStorage.removeItem('usuario');
                        window.location.href = 'login.html';
                    });
                } else {
                    usernameElement.textContent = 'Invitado';
                    logoutBtn.textContent = 'Iniciar Sesión';
                    logoutBtn.addEventListener('click', function(e) {
                        e.preventDefault();
                        window.location.href = 'login.html';
                    });
                }
            })
            .catch(error => console.error("Error al cargar el menú:", error));
    });
    
    // Obtener el nombre del usuario desde la base de datos
    async function obtenerNombreUsuario() {
        try {
            const response = await fetch('Base de datos/endPointGetUsuario.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ accion: 'obtenerNombre' }),
            });

            const data = await response.json();
            if (data.success) {
                usernameSpan.textContent = data.nombre; // Mostrar el nombre del usuario
            } else {
                console.error('Error al obtener el nombre del usuario:', data.message);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    }

    // Llamar a la función para obtener el nombre del usuario
    obtenerNombreUsuario();

    document.addEventListener('click', function(event) {
        const menuLateral = document.getElementById('menuLateral');
        const btnMenu = document.getElementById('btn-menu');
    
        if (
            menuLateral &&
            !menuLateral.contains(event.target) &&
            !btnMenu.contains(event.target)
        ) {
            menuLateral.classList.remove('abierto');
        }
    });
    

    // Abrir el registro desde dentro del iframe (Login.html)
    window.abrirRegister = function () {
        cerrarModal();
        abrirModal("Registro.html", "registro");
    };
    
    
    window.abrirLogin = function () {
        cerrarModal();
        abrirModal("Login.html", "login"); // vuelve al tamaño original
    };
    

    // Función para cerrar el modal al hacer clic en el botón cerrar

});

// Variable global para almacenar el modal
let modal = null;

// Función para cerrar el modal
function cerrarModal() {
    console.log("Intentando cerrar el modal...");
    if (modal) {
        modal.remove(); // Elimina el modal del DOM
        modal = null; // Reinicia la variable
        console.log("Modal cerrado correctamente.");
    } else {
        console.log("No hay modal abierto.");
    }
}

// Función para abrir un modal
function abrirModal(url) {
    cerrarModal(); // Cierra cualquier modal existente antes de abrir uno nuevo

    modal = document.createElement("div");
    modal.id = "modal";
    modal.innerHTML = `
        <div class="modal-content">
            <span class="cerrar" onclick="cerrarModal()">&times;</span>
            <iframe src="${url}" frameborder="0" style="width:100%;height:100%;"></iframe>
        </div>
    `;
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;
    document.body.appendChild(modal);
}

document.addEventListener("DOMContentLoaded", function () {
    // Verificar sesión al cargar
    const usuario = JSON.parse(sessionStorage.getItem('usuario'));
    if (usuario && usuario.nombre) {
        actualizarMenuUsuario(usuario.nombre);
    }
});