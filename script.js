import dotenv from "dotenv";
import OpenAI, { OpenAI } from "openai";

dotenv.config();

const openai = new OpenAI({
apikey: process.env.OPENAI_API_KEY,
baseURL: process.env.OPENAI_BASE_URL,
});



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

    // --- MODAL LOGIN ---
    function abrirModal(url) {
        const modal = document.getElementById('modal-login');
        const modalContent = modal.querySelector('.modal-content');
        // Crear iframe para cargar el login
        const iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.frameBorder = '0';
        iframe.style.width = '100%';
        iframe.style.minHeight = '500px';
        iframe.style.border = 'none';
        iframe.style.borderRadius = '15px';
        // Limpiar y agregar iframe
        modalContent.innerHTML = '';
        modalContent.appendChild(iframe);
        // Mostrar modal
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
    function cerrarModal() {
        const modal = document.getElementById('modal-login');
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
    // Evento para abrir modal al dar click en el perfil
    if (typeof btnPerfil !== 'undefined' && btnPerfil) {
        btnPerfil.addEventListener('click', function (e) {
            e.preventDefault();
            abrirModal('Login.html'); // Usa siempre la mayúscula correcta
        });
    }
    // Cerrar modal al hacer click fuera del contenido
    var modalLogin = document.getElementById('modal-login');
    if (modalLogin) {
        modalLogin.addEventListener('click', function (e) {
            if (e.target === this) {
                cerrarModal();
            }
        });
    }
    // Cerrar modal con Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            cerrarModal();
        }
    });
    // Hacer accesible globalmente para iframe
    window.abrirModal = abrirModal;
    window.cerrarModal = cerrarModal;

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
    
document.addEventListener("DOMContentLoaded", function() {
    // Función para abrir modal
    function abrirModal(url) {
        const modal = document.getElementById('modal-login');
        const modalContent = modal.querySelector('.modal-content');
        
        // Crear iframe
        const iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.frameBorder = '0';
        iframe.style.width = '100%';
        iframe.style.minHeight = '500px'; // Altura mínima
        iframe.style.border = 'none';
        iframe.style.borderRadius = '15px';
        
        // Limpiar y agregar iframe
        modalContent.innerHTML = '';
        modalContent.appendChild(iframe);
        
        // Mostrar modal
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Evitar scroll del body
    }

    // Función para cerrar modal
    function cerrarModal() {
        const modal = document.getElementById('modal-login');
        modal.classList.add('hidden');
        document.body.style.overflow = ''; // Restaurar scroll
    }

    // Evento para botón de perfil
    document.getElementById('btn-perfil').addEventListener('click', function(e) {
        e.preventDefault();
        abrirModal('login.html');
    });

    // Cerrar modal al hacer clic fuera
    document.getElementById('modal-login').addEventListener('click', function(e) {
        if (e.target === this) {
            cerrarModal();
        }
    });

    // También puedes agregar esto para cerrar con Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            cerrarModal();
        }
    });
})
});

// Variable global para almacenar el modal
let modal = null;



document.addEventListener("DOMContentLoaded", function () {
    // Verificar sesión al cargar
    const usuario = JSON.parse(sessionStorage.getItem('usuario'));
    if (usuario && usuario.nombre) {
        actualizarMenuUsuario(usuario.nombre);
    }
});



// POLITICAS 

// Funcionalidad para los enlaces de políticas
document.addEventListener('DOMContentLoaded', function() {
    // Redirigir todos los enlaces de políticas a politica.html
    const policyLinks = document.querySelectorAll('.footer-links a');
    policyLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'politica.html';
        });
    });

    // Redes sociales - abrir en nueva pestaña
    const instagramLink = document.querySelector('.footer-social a:first-child');
    const facebookLink = document.querySelector('.footer-social a:last-child');
    
    // Reemplaza estas URLs con las reales de Bloom Beauty
    instagramLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.open('https://www.instagram.com/bloombeauty', '_blank');
    });
    
    facebookLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.open('https://www.facebook.com/bloombeauty', '_blank');
    });

    // Animación para el correo electrónico
    const subscribeForm = document.querySelector('.footer-subscribe');
    const emailInput = subscribeForm.querySelector('input[type="email"]');
    const submitButton = subscribeForm.querySelector('button');
    
    submitButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Validación simple del correo
        if (emailInput.value && emailInput.value.includes('@')) {
            showEmailNotification();
            emailInput.value = ''; // Limpiar el campo después de enviar
        } else {
            alert('Por favor ingresa un correo electrónico válido');
        }
    });
    
    function showEmailNotification() {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = 'email-notification';
        notification.textContent = '✔ Solicitud enviada. ¡En un instante nos ponemos en contacto!';
        
        // Estilos para la notificación
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = '#4CAF50';
        notification.style.color = 'white';
        notification.style.padding = '15px 25px';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        notification.style.zIndex = '1000';
        notification.style.animation = 'slideIn 0.5s, fadeOut 0.5s 2.5s';
        
        // Agregar al documento
        document.body.appendChild(notification);
        
        // Eliminar después de 3 segundos
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
    
    // Añadir los keyframes de animación dinámicamente
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});

document.addEventListener('DOMContentLoaded', function () {
    // Selecciona todos los botones "Comprar ahora"
    const comprarBtns = document.querySelectorAll('.btn-comprar');
    const modal = document.getElementById('producto-modal');
    const closeModal = modal.querySelector('.close-modal');

    // Función para abrir el modal y rellenar datos
    function abrirModalProducto(productoElem) {
        // Obtener datos del producto
        const img = productoElem.querySelector('img').src;
        const titulo = productoElem.querySelector('h3').textContent;
        const descripcion = productoElem.querySelector('.descripcion').textContent;
        const precio = productoElem.querySelector('.precio').textContent;
        const rating = productoElem.querySelector('.rating').innerHTML;

        // Rellenar el modal
        document.getElementById('modal-imagen').src = img;
        document.getElementById('modal-titulo').textContent = titulo;
        document.getElementById('modal-descripcion').textContent = descripcion;
        document.getElementById('modal-precio').textContent = precio;
        document.getElementById('modal-rating').innerHTML = rating;
        // Opcional: limpia detalles y beneficios si no tienes datos
        document.getElementById('modal-detalles-texto').textContent = '';
        document.getElementById('modal-beneficios').innerHTML = '';

        // Renderizar PayPal dinámicamente
        const paypalContainer = document.getElementById('paypal-button-container');
        paypalContainer.innerHTML = ""; // Limpia el contenedor

        // Extrae solo el número del precio (ejemplo: "$240.00 MXN" => 240.00)
        const monto = parseFloat(precio.replace(/[^0-9.]/g, ''));

        if (window.paypal) {
            paypal.Buttons({
                createOrder: function(data, actions) {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: monto.toFixed(2)
                            }
                        }]
                    });
                },
                onApprove: function(data, actions) {
                    return actions.order.capture().then(function(details) {
                        alert('Gracias por tu compra, ' + details.payer.name.given_name + '!');
                    });
                }
            }).render('#paypal-button-container');
        }

        // Mostrar el modal
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    // Cerrar modal
    closeModal.addEventListener('click', function () {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    });

    // Cerrar modal al hacer clic fuera del contenido
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });

    // Cerrar modal con Escape
    document.addEventListener('keydown', function (e) {
        if (!modal.classList.contains('hidden') && e.key === 'Escape') {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });

    // Asigna evento a cada botón "Comprar ahora"
    comprarBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const productoElem = btn.closest('.producto');
            abrirModalProducto(productoElem);
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Función para manejar el carrito
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Función para guardar el carrito en localStorage
    function guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    // Función para mostrar notificación de carrito
    function mostrarNotificacionCarrito() {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = 'Producto añadido al carrito';
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 500);
        }, 2000);
    }

    // Función para añadir producto al carrito
    function añadirAlCarrito(producto) {
        // Buscar si el producto ya está en el carrito
        const productoExistente = carrito.find(item => item.nombre === producto.nombre);
        
        if (productoExistente) {
            productoExistente.cantidad += 1;
        } else {
            carrito.push({
                ...producto,
                cantidad: 1
            });
        }
        
        guardarCarrito();
        mostrarNotificacionCarrito();
    }

    // Configurar botones "Añadir al carrito" en los productos
    document.querySelectorAll('.btn-add-carrito').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const productoElem = btn.closest('.producto');
            const producto = {
                nombre: productoElem.querySelector('h3').textContent,
                precio: productoElem.querySelector('.precio').textContent,
                imagen: productoElem.querySelector('img').src,
                descripcion: productoElem.querySelector('.descripcion').textContent
            };
            añadirAlCarrito(producto);
        });
    });

    // Modal de producto
    const comprarBtns = document.querySelectorAll('.btn-comprar');
    const modal = document.getElementById('producto-modal');
    const closeModal = modal.querySelector('.close-modal');

    // Función para abrir el modal y rellenar datos
    function abrirModalProducto(productoElem) {
        // Obtener datos del producto
        const producto = {
            imagen: productoElem.querySelector('img').src,
            nombre: productoElem.querySelector('h3').textContent,
            descripcion: productoElem.querySelector('.descripcion').textContent,
            precio: productoElem.querySelector('.precio').textContent,
            rating: productoElem.querySelector('.rating').innerHTML
        };

        // Rellenar el modal
        document.getElementById('modal-imagen').src = producto.imagen;
        document.getElementById('modal-titulo').textContent = producto.nombre;
        document.getElementById('modal-descripcion').textContent = producto.descripcion;
        document.getElementById('modal-precio').textContent = producto.precio;
        document.getElementById('modal-rating').innerHTML = producto.rating;

        // Configurar botón "Añadir al carrito" del modal
        const btnAddModal = document.querySelector('.btn-add-carrito-modal');
        btnAddModal.onclick = function() {
            añadirAlCarrito(producto);
        };

        // Configurar botón "Comprar ahora" del modal
        const btnComprarModal = document.querySelector('.btn-comprar-ahora-modal');
        btnComprarModal.onclick = function() {
            añadirAlCarrito(producto);
            window.location.href = 'carrito.html';
        };

        // Renderizar PayPal dinámicamente
        const paypalContainer = document.getElementById('paypal-button-container');
        paypalContainer.innerHTML = ""; // Limpia el contenedor

        // Extrae solo el número del precio (ejemplo: "$240.00 MXN" => 240.00)
        const monto = parseFloat(producto.precio.replace(/[^0-9.]/g, ''));

        if (window.paypal) {
            paypal.Buttons({
                createOrder: function(data, actions) {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: monto.toFixed(2)
                            }
                        }]
                    });
                },
                onApprove: function(data, actions) {
                    return actions.order.capture().then(function(details) {
                        alert('Gracias por tu compra, ' + details.payer.name.given_name + '!');
                    });
                }
            }).render('#paypal-button-container');
        }

        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    // Cerrar modal
    closeModal.addEventListener('click', function() {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    });

    // Cerrar modal al hacer clic fuera del contenido
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });

    // Cerrar modal con Escape
    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('hidden') && e.key === 'Escape') {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });

    // Asignar evento a cada botón "Comprar ahora"
    comprarBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productoElem = btn.closest('.producto');
            abrirModalProducto(productoElem);
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const comprarBtns = document.querySelectorAll('.btn-comprar');
    const modal = document.getElementById('producto-modal');
    const closeModal = modal.querySelector('.close-modal');

    // Función para abrir el modal y rellenar datos
    function abrirModalProducto(productoElem) {
        // Obtener datos del producto
        const img = productoElem.querySelector('img').src;
        const titulo = productoElem.querySelector('h3').textContent;
        const descripcion = productoElem.querySelector('.descripcion').textContent;
        const precio = productoElem.querySelector('.precio').textContent;
        const ratingHTML = productoElem.querySelector('.rating').innerHTML;

        // Rellenar el modal
        document.getElementById('modal-imagen').src = img;
        document.getElementById('modal-titulo').textContent = titulo;
        document.getElementById('modal-descripcion').textContent = descripcion;
        document.getElementById('modal-precio').textContent = precio;
        document.getElementById('modal-rating').innerHTML = ratingHTML;

        // Renderizar PayPal dinámicamente
        const paypalContainer = document.getElementById('paypal-button-container');
        paypalContainer.innerHTML = ""; // Limpia el contenedor

        // Extrae solo el número del precio (ejemplo: "$240.00 MXN" => 240.00)
        const monto = parseFloat(precio.replace(/[^0-9.]/g, ''));

        if (window.paypal) {
            paypal.Buttons({
                createOrder: function(data, actions) {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: monto.toFixed(2)
                            }
                        }]
                    });
                },
                onApprove: function(data, actions) {
                    return actions.order.capture().then(function(details) {
                        alert('Gracias por tu compra, ' + details.payer.name.given_name + '!');
                    });
                }
            }).render('#paypal-button-container');
        }

        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    // Asigna evento a cada botón "Comprar ahora"
    comprarBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const productoElem = btn.closest('.producto');
            abrirModalProducto(productoElem);
        });
    });

    // Cerrar modal
    closeModal.addEventListener('click', function () {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    });

    // Cerrar modal al hacer clic fuera del contenido
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });

    // Cerrar modal con Escape
    document.addEventListener('keydown', function (e) {
        if (!modal.classList.contains('hidden') && e.key === 'Escape') {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Función para añadir producto al carrito (usa la misma estructura que productos.js)
    function añadirAlCarritoIndex(producto) {
        let carrito = JSON.parse(localStorage.getItem('cart')) || [];
        const itemExistente = carrito.find(item => item.nombre === producto.nombre);
        if (itemExistente) {
            itemExistente.cantidad += 1;
        } else {
            carrito.push({
                id: producto.id || Date.now(), // Usa un id si lo tienes
                nombre: producto.nombre,
                imagen: producto.imagen,
                precio: parseFloat(producto.precio.replace('$', '').replace(' MXN', '')),
                descripcion: producto.descripcion,
                cantidad: 1
            });
        }
        localStorage.setItem('cart', JSON.stringify(carrito));
        mostrarNotificacionCarrito(producto.nombre);
    }

    // Notificación visual
    function mostrarNotificacionCarrito(nombreProducto) {
        const notificacion = document.createElement('div');
        notificacion.className = 'cart-notification';
        notificacion.textContent = `✔ ${nombreProducto} añadido al carrito`;
        document.body.appendChild(notificacion);
        setTimeout(() => {
            notificacion.classList.add('fade-out');
            setTimeout(() => notificacion.remove(), 500);
        }, 2000);
    }

    // Asigna evento a los botones de añadir al carrito en index
    document.querySelectorAll('.btn-add-carrito').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const productoElem = btn.closest('.producto');
            const producto = {
                nombre: productoElem.querySelector('h3').textContent,
                precio: productoElem.querySelector('.precio').textContent,
                imagen: productoElem.querySelector('img').src,
                descripcion: productoElem.querySelector('.descripcion').textContent
            };
            añadirAlCarritoIndex(producto);
        });
    });

    // También para el botón del modal
    const btnAddModal = document.querySelector('.btn-add-carrito-modal');
    if (btnAddModal) {
        btnAddModal.addEventListener('click', function () {
            const modal = document.getElementById('producto-modal');
            const producto = {
                nombre: document.getElementById('modal-titulo').textContent,
                precio: document.getElementById('modal-precio').textContent,
                imagen: document.getElementById('modal-imagen').src,
                descripcion: document.getElementById('modal-descripcion').textContent
            };
            añadirAlCarritoIndex(producto);
        });
    }
});

// Puedes poner esto en ambos archivos, adaptando el selector del contenedor de productos
function buscarProductos() {
    const searchBar = document.getElementById('search-bar');
    if (!searchBar) return;
    
    searchBar.addEventListener('input', function () {
        const query = searchBar.value.toLowerCase();
        
        // Buscar en ambos contenedores posibles
        const contenedores = [
            document.getElementById('productos-container'),
            document.getElementById('destacados-container')
        ].filter(container => container);
        
        contenedores.forEach(container => {
            container.querySelectorAll('.producto').forEach(producto => {
                const nombre = producto.querySelector('h3').textContent.toLowerCase();
                const descripcion = producto.querySelector('.descripcion').textContent.toLowerCase();
                
                if (nombre.includes(query) || descripcion.includes(query)) {
                    producto.style.display = '';
                } else {
                    producto.style.display = 'none';
                }
            });
        });
    });
}

// Llama a la función después de renderizar los productos
document.addEventListener('DOMContentLoaded', function () {
    buscarProductos();
});




