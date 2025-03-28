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

    document.addEventListener("DOMContentLoaded", function () {
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
    });
    


    
      
});