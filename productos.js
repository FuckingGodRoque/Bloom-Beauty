// Datos de productos (puedes reemplazar esto con una llamada API)
const productos = [
    {
        id: 1,
        nombre: "Bloom Punch",
        imagen: "Recursos/BloomPunch.png",
        descripcion: "Bolsa de lino con extractos naturales para una piel radiante.",
        precio: "$40.00 MXN",
        categoria: "accesorios",
        detalles: "El Bloom Punch es nuestro producto estrella, formulado con ingredientes 100% naturales que nutren y revitalizan la piel. Perfecto para uso diario.",
        rating: 4
    },
    {
        id: 2,
        nombre: "Glow Restore",
        imagen: "Recursos/GlowRestore.png",
        descripcion: "Suave, bello y natural. Restaura el brillo natural de tu piel.",
        precio: "$240.00 MXN",
        categoria: "maquillaje",
        detalles: "El Glow Restore es un tratamiento intensivo que devuelve el brillo natural a tu piel en solo 7 días de uso continuo.",
        rating: 4.5
    },
    {
        id: 3,
        nombre: "HydraBloom",
        imagen: "Recursos/HydraBloom.png",
        descripcion: "Simple y eficaz. Hidratación intensiva para pieles secas.",
        precio: "$140.00 MXN",
        categoria: "cuidado-piel",
        detalles: "HydraBloom es nuestra solución para pieles secas y deshidratadas, con una fórmula que retiene la humedad por hasta 24 horas.",
        rating: 4.2
    },
    {
        id: 4,
        nombre: "Lumi Drops",
        imagen: "Recursos/LumiDrops.png",
        descripcion: "Gotitas de búho. Iluminación instantánea para un look fresco.",
        precio: "$100.00 MXN",
        categoria: "maquillaje",
        detalles: "Las Lumi Drops son tu secreto para un cutis radiante en segundos. Fórmula ligera que no obstruye los poros.",
        rating: 4.7
    },
    {
        id: 5,
        nombre: "Bloom Balm",
        imagen: "Recursos/Modelo1.png",
        descripcion: "Bálsamo nutritivo para labios y cutículas.",
        precio: "$60.00 MXN",
        categoria: "cuidado-piel",
        detalles: "Bálsamo formulado con cera de abejas y aceites esenciales para hidratación profunda.",
        rating: 4.3
    },
    {
        id: 6,
        nombre: "Dew Essence",
        imagen: "Recursos/Modelo2.png",
        descripcion: "Esencia ligera para hidratación instantánea.",
        precio: "$180.00 MXN",
        categoria: "cuidado-piel",
        detalles: "Esencia ultraligera que absorbe rápidamente sin dejar residuos grasos.",
        rating: 4.8
    }
];

// Carrito de compras
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const contadorCarrito = document.getElementById('contador-carrito');

// Función para actualizar el contador del carrito
function actualizarCarrito() {
    contadorCarrito.textContent = carrito.reduce((total, item) => total + item.cantidad, 0);
    localStorage.setItem('carrito', JSON.stringify(carrito));
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
                <button class="btn-comprar">Comprar ahora</button>
                <button class="btn-add-carrito" data-id="${producto.id}">
                    <img src="Recursos/AddCarrito.png" alt="Añadir al carrito">
                </button>
            </div>
            <button class="btn-ver-detalles" data-id="${producto.id}">Ver detalles</button>
        `;
        container.appendChild(productoElement);
    });

    // Agregar event listeners a los botones
    document.querySelectorAll('.btn-add-carrito').forEach(btn => {
        btn.addEventListener('click', agregarAlCarrito);
    });

    document.querySelectorAll('.btn-ver-detalles').forEach(btn => {
        btn.addEventListener('click', mostrarDetallesProducto);
    });
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
    
    const itemExistente = carrito.find(item => item.id === id);
    
    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }
    
    actualizarCarrito();
    
    // Feedback visual mejorado
    const btn = e.currentTarget;
    const icon = btn.querySelector('img');
    
    // Cambiar temporalmente el icono
    icon.src = "Recursos/Check.png";
    btn.classList.add('added-to-cart');
    
    // Restaurar después de la animación
    setTimeout(() => {
        btn.classList.remove('added-to-cart');
        icon.src = "Recursos/AddCarrito.png";
    }, 1000);
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
    btnAddModal.addEventListener('click', agregarAlCarrito);
    
    modal.classList.remove('hidden');
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

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos();
    configurarFiltros();
    configurarModal();
    configurarCarrito();
    actualizarCarrito();
});