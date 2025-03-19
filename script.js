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

    // Evento para abrir el menú de usuario
    btnMenu.addEventListener("click", function () {
        userMenu.style.display = userMenu.style.display === "block" ? "none" : "block";
    });

    // Cerrar el menú si se hace clic fuera de él
    window.addEventListener("click", function (event) {
        if (event.target !== btnMenu && !userMenu.contains(event.target)) {
            userMenu.style.display = "none";
        }
    });
});