document.addEventListener("DOMContentLoaded", function () {
    const verMasBtn = document.getElementById("ver-mas");
    const productos = document.querySelectorAll("#productos-container .producto");
    const btnMenu = document.querySelector(".btn-menu");
    const userMenu = document.getElementById("user-menu");

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
    const btnPerfil = document.getElementById("btn-perfil");

    // Abrir carrito.html en una nueva pestaña
    btnCarrito.addEventListener("click", function () {
        window.open("carrito.html", "_blank");
    });

    // Mostrar login.html como ventana flotante
    btnPerfil.addEventListener("click", function () {
        const loginModal = document.createElement("div");
        loginModal.id = "login-modal";
        loginModal.innerHTML = `
            <div class="modal-content">
                <span class="cerrar" onclick="document.getElementById('login-modal').remove()">&times;</span>
                <iframe src="Login.html" frameborder="0" style="width: 100%; height: 100%;"></iframe>
            </div>
        `;
        loginModal.style.cssText = `
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
        document.body.appendChild(loginModal);
    });

    // Función para manejar el registro y redirigir al login
    window.handleRegister = function () {
        document.getElementById("register-modal").remove();
        const loginModal = document.createElement("div");
        loginModal.id = "login-modal";
        loginModal.innerHTML = `
            <div class="modal-content">
                <span class="cerrar" onclick="document.getElementById('login-modal').remove()">&times;</span>
                <iframe src="Login.html" frameborder="0" style="width: 100%; height: 100%;"></iframe>
            </div>
        `;
        loginModal.style.cssText = `
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
        document.body.appendChild(loginModal);
    };
});