// Datos de productos (puedes reemplazar esto con una llamada API)
const productos = [
    {
        id: 1,
        nombre: "Bloom Tote Bag",
        imagen: "Recursos/BloomPunch.png",
        descripcion: "Material: Yute orgánico (100% biodegradable) + algodón reciclado.   ",
        precio: "$200.00 MXN",
        categoria: "accesorios",
        detalles: " Material: Yute orgánico (100% biodegradable) + algodón reciclado.   - Capacidad: 35x40 cm.",
        rating: 3
    },
    {
        id: 2,
        nombre: "Bloom Clarify Serum",
        imagen: "Recursos/GlowRestore.png",
        descripcion: "Para una piel grasa",
        precio: "$240.00 MXN",
        categoria: "cuidado-piel",
        detalles: "- Ingredientes: Agua de hamamelis (70%), Niacinamida (5%), Aceite de jojoba (5%), Arcilla blanca (5%).   - Vegano: Sí   ",
        rating: 5
    },
    {
        id: 3,
        nombre: "Bloom Deep Hydration Serum",
        imagen: "Recursos/HydraBloom.png",
        descripcion: "Tipo de piel: Seca ",
        precio: "$140.00 MXN",
        categoria: "cuidado-piel",
        detalles: "- Ingredientes: Ácido hialurónico (2%), Manteca de mango (10%), Aceite de argán (8%), Miel de manuka (5%).   - Vegano: No (contiene miel) ",
        rating: 4
    },
    {
        id: 4,
        nombre: "Bloom Purify Scrub",
        imagen: "Recursos/LumiDrops.png",
        descripcion: "Tipo de piel: Grasa",
        precio: "$100.00 MXN",
        categoria: "maquillaje",
        detalles: " Ingredientes: Azúcar de caña (30%), Aceite de árbol de té (5%), Jugo de limón (5%), Semillas de frambuesa (5%).   - Vegano: Sí  ",
        rating: 4
    },
    {
        id: 5,
        nombre: "Bloom Sunny Shield ",
        imagen: "Recursos/Modelo1.png",
        descripcion: "Protector solar (FPS 30)",
        precio: "$60.00 MXN",
        categoria: "cuidado-piel",
        detalles: "- Ingredientes: Óxido de zinc (15%), Aceite de zanahoria (10%), Manteca de karité (5%), Caléndula (5%).   - Vegano: Sí   .",
        rating: 5
    },
    {
        id: 6,
        nombre: "Bloom Calm Wash",
        imagen: "Recursos/Modelo2.png",
        descripcion: "Tipo de piel: Seca/Sensible   ",
        precio: "$180.00 MXN",
        categoria: "cuidado-piel",
        detalles: " Ingredientes: Leche de avena (50%), Aceite de almendras (10%), Miel (5%), Caléndula (5%).   - Vegano: No (contiene miel)   ",
        rating: 5
    },
    {
        id: 7,
        nombre: "Bloom Volume Shampoo",
        imagen: "Recursos/PureMist.png",
        descripcion: "Tipo de cabello: Fino",
        precio: "$110.00 MXN",
        categoria: "maquillaje",
        detalles: "- Ingredientes: Infusión de romero (60%), Aloe vera (20%), Proteína de quinoa (5%), Aceite de menta (3%).   - Vegano: Sí   ",
        rating: 4
    },
    {
        id: 8,
        nombre: "Bloom Repair Conditioner",
        imagen: "Recursos/SolarVeil.png",
        descripcion: " Tipo de cabello: Dañado",
        precio: "$130.00 MXN",
        categoria: "maquillaje",
        detalles: " Ingredientes: Manteca de karité (15%), Aceite de argán (10%), Keratina vegetal (5%), Leche de coco (20%).   - Vegano: Sí  ",
        rating: 5
    },
    {
        id: 9,
        nombre: "Bloom Relax Soap",
        imagen: "Recursos/NourishBalm.png",
        descripcion: " Aroma: Lavanda",
        precio: "$130.00 MXN",
        categoria: "cuidado-piel",
        detalles: "- Ingredientes: Aceite de oliva (40%), Aceite esencial de lavanda (5%), Arcilla blanca (10%).   - Vegano: Sí   ",
        rating: 5
    },
     {
        id: 10,
        nombre: "Bloom Fresh Cleanser ",
        imagen: "Recursos/SilkGlow.png",
        descripcion: "Tipo de piel: Mixta  ",
        precio: "$130.00 MXN",
        categoria: "cuidado-piel",
        detalles: " Ingredientes: Aceite de oliva (40%), Arcilla rosa (10%), Miel (5%), Extracto de manzanilla (5%).   - Vegano: No (contiene miel)  ",
        rating: 5
    }
];

// Carrito de compras
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const contadorCarrito = document.getElementById('contador-carrito');

// Función para actualizar el contador del carrito
// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    document.getElementById('contador-carrito').textContent = totalItems;
}

// Función para renderizar productos
function renderizarProductos(categoria = 'todos') {
    const container = document.getElementById('productos-container');
    container.innerHTML = '';

    const productosFiltrados = categoria === 'todos' 
        ? productos 
        : productos.filter(p => p.categoria === categoria);

    productosFiltrados.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.className = 'producto';
        productoElement.setAttribute('data-categoria', producto.categoria);
        productoElement.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p class="descripcion">${producto.descripcion}</p>
            <p class="precio">${producto.precio}</p>
            <div class="rating">
                ${generarEstrellasRating(producto.rating)}
                <span>(${producto.rating.toFixed(1)})</span>
            </div>
            <div class="botones">
                <button class="btn-ver-detalles" data-id="${producto.id}">Ver detalles</button>
                <button class="btn-add-carrito" data-id="${producto.id}">
                    <img src="Recursos/AddCarrito.png" alt="Añadir al carrito">
                </button>
            </div>
            <div class="paypal-btn-container" id="paypal-btn-container-${producto.id}"></div>
        `;
        container.appendChild(productoElement);

        // Renderiza el botón de PayPal para este producto
        renderizarBotonPaypal(producto);
    });

    
    // Agregar event listeners a los botones
    document.querySelectorAll('.btn-add-carrito').forEach(btn => {
        btn.addEventListener('click', agregarAlCarrito);
    });

    document.querySelectorAll('.btn-ver-detalles').forEach(btn => {
        btn.addEventListener('click', mostrarDetallesProducto);
    });
}

// Nueva función para renderizar el botón de PayPal por producto
function renderizarBotonPaypal(producto) {
    // Convierte el precio a número y a USD si lo necesitas, aquí lo dejamos en MXN
    const precio = parseFloat(producto.precio.replace('$', '').replace(' MXN', '').replace(',', ''));

    // Espera a que el SDK de PayPal esté cargado
    if (window.paypal) {
        paypal.Buttons({
            style: {
                layout: 'horizontal',
                color:  'gold',
                shape:  'rect',
                label:  'paypal',
                height: 35
            },
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: precio.toFixed(2),
                            currency_code: 'MXN'
                        },
                        description: producto.nombre
                    }]
                });
            },
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                    alert('Gracias por tu compra, ' + details.payer.name.given_name + '!');
                });
            }
        }).render(`#paypal-btn-container-${producto.id}`);
    } else {
        // Si PayPal aún no está listo, intenta de nuevo después de un tiempo
        setTimeout(() => renderizarBotonPaypal(producto), 500);
    }
}

// Función para generar estrellas de rating
function generarEstrellasRating(rating) {
    let estrellas = '';
    const estrellasLlenas = Math.floor(rating);
    const mediaEstrella = rating % 1 >= 0.5;
    
    for (let i = 0; i < estrellasLlenas; i++) {
        estrellas += '<img src="Recursos/EstrellaNegra.png" alt="Estrella llena">';
    }
    
    if (mediaEstrella) {
        estrellas += '<img src="Recursos/EstrellaMedia.png" alt="Media estrella">';
    }
    
    const estrellasVacias = 5 - estrellasLlenas - (mediaEstrella ? 1 : 0);
    for (let i = 0; i < estrellasVacias; i++) {
        estrellas += '<img src="Recursos/EstrellaBlanca.png" alt="Estrella vacía">';
    }
    
    return estrellas;
}

function agregarAlCarrito(e) {
    const id = parseInt(e.currentTarget.getAttribute('data-id'));
    const producto = productos.find(p => p.id === id);
    
    let carrito = JSON.parse(localStorage.getItem('cart')) || [];
    const itemExistente = carrito.find(item => item.id === id);
    
    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            imagen: producto.imagen,
            precio: parseFloat(producto.precio.replace('$', '').replace(' MXN', '')),
            cantidad: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(carrito));
    actualizarContadorCarrito();
    mostrarNotificacionCarrito(producto.nombre);
}

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

// Función para mostrar detalles del producto
function mostrarDetallesProducto(e) {
    const id = parseInt(e.currentTarget.getAttribute('data-id'));
    const producto = productos.find(p => p.id === id);
    
    const modal = document.getElementById('modal-producto');
    document.getElementById('modal-imagen').src = producto.imagen;
    document.getElementById('modal-titulo').textContent = producto.nombre;
    document.getElementById('modal-descripcion').textContent = producto.descripcion;
    document.getElementById('modal-precio').textContent = producto.precio;
    document.getElementById('modal-detalles-texto').textContent = producto.detalles;
    
    // Configurar botón "Añadir al carrito" del modal
    const btnAddModal = document.querySelector('.btn-add-carrito-modal');
    btnAddModal.setAttribute('data-id', producto.id);
    
    // Eliminar event listeners anteriores para evitar duplicados
    btnAddModal.replaceWith(btnAddModal.cloneNode(true));
    document.querySelector('.btn-add-carrito-modal').addEventListener('click', agregarAlCarrito);
    
    // Renderizar botón de PayPal en el modal
    const paypalModalDiv = document.getElementById('paypal-btn-modal');
    paypalModalDiv.innerHTML = ""; // Limpia el contenedor antes de renderizar
    const precio = parseFloat(producto.precio.replace('$', '').replace(' MXN', '').replace(',', ''));
    if (window.paypal) {
        paypal.Buttons({
            style: {
                layout: 'horizontal',
                color:  'gold',
                shape:  'rect',
                label:  'paypal',
                height: 35
            },
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: precio.toFixed(2),
                            currency_code: 'MXN'
                        },
                        description: producto.nombre
                    }]
                });
            },
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                    alert('Gracias por tu compra, ' + details.payer.name.given_name + '!');
                });
            }
        }).render('#paypal-btn-modal');
    }

    modal.classList.remove('hidden');
}

// Función para configurar el modal
function configurarModal() {
    const modal = document.getElementById('modal-producto');
    const closeModal = document.querySelector('.close-modal');
    
    // Cerrar con el botón X
    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
    
    // Cerrar haciendo clic fuera del modal
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
    
    // Cerrar con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
        }
    });
}

// Función para filtrar productos por categoría
function configurarFiltros() {
    const botonesCategoria = document.querySelectorAll('.btn-categoria');
    
    botonesCategoria.forEach(boton => {
        boton.addEventListener('click', () => {
            // Remover clase active de todos los botones
            botonesCategoria.forEach(btn => btn.classList.remove('active'));
            // Agregar clase active al botón clickeado
            boton.classList.add('active');
            
            const categoria = boton.getAttribute('data-categoria');
            renderizarProductos(categoria);
        });
    });
}

// Función para cerrar el modal
function configurarModal() {
    const modal = document.getElementById('modal-producto');
    const closeModal = document.querySelector('.close-modal');
    
    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
}

// Función para configurar el carrito
function configurarCarrito() {
    const btnCarrito = document.getElementById('btn-carrito');
    
    btnCarrito.addEventListener('click', () => {
        window.location.href = 'carrito.html';
    });
}

// Puedes poner esto en ambos archivos, adaptando el selector del contenedor de productos
function buscarProductos() {
    const searchBar = document.getElementById('search-bar');
    if (!searchBar) return;
    searchBar.addEventListener('input', function () {
        const query = searchBar.value.toLowerCase();
        document.querySelectorAll('.producto').forEach(producto => {
            const nombre = producto.querySelector('h3').textContent.toLowerCase();
            const descripcion = producto.querySelector('.descripcion').textContent.toLowerCase();
            if (nombre.includes(query) || descripcion.includes(query)) {
                producto.style.display = '';
            } else {
                producto.style.display = 'none';
            }
        });
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos();
    configurarFiltros();
    configurarModal();
    configurarCarrito();
    actualizarContadorCarrito();
    buscarProductos();
});