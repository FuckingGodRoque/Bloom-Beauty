document.addEventListener('DOMContentLoaded', function() {
    let carrito = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.cart-items');
    const cartHeader = document.querySelector('.cart-header h2');
    
    // Mostrar productos del carrito
    function renderizarCarrito() {
        if (carrito.length === 0) {
            cartContainer.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
            actualizarTotales(0);
            return;
        }
        
        let html = '';
        let subtotal = 0;
        
        carrito.forEach(item => {
            const itemTotal = item.precio * item.cantidad;
            subtotal += itemTotal;
            
            html += `
                <div class="cart-item">
                    <div class="product-image">
                        <img src="${item.imagen}" alt="${item.nombre}">
                    </div>
                    <div class="item-details">
                        <h3>${item.nombre}</h3>
                        <p class="product-description">${item.descripcion || 'Producto de belleza premium'}</p>
                        <div class="controls-container">
                            <div class="size-quantity">
                                <div class="quantity-controls">
                                    <button class="quantity-btn" onclick="cambiarCantidad(${item.id}, -1)">−</button>
                                    <span class="quantity">${item.cantidad}</span>
                                    <button class="quantity-btn" onclick="cambiarCantidad(${item.id}, 1)">+</button>
                                </div>
                            </div>
                            <div class="price-remove-section">
                                <p class="precio">$${item.precio.toFixed(2)} MXN</p>
                                <button class="remove-btn" onclick="eliminarProducto(${item.id})">Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        
        cartContainer.innerHTML = html;
        actualizarTotales(subtotal);
        cartHeader.textContent = `Carrito (${carrito.reduce((total, item) => total + item.cantidad, 0)})`;
    }
    
    // Actualizar totales
    function actualizarTotales(subtotal) {
        const envio = subtotal > 500 ? 0 : 99;
        const total = subtotal + envio;
        
        document.querySelector('.price-row:nth-child(1) span:last-child').textContent = `$${subtotal.toFixed(2)} MXN`;
        document.querySelector('.price-row:nth-child(2) span:last-child').textContent = envio === 0 ? 'Gratis' : `$${envio.toFixed(2)} MXN`;
        document.querySelector('.price-row.total span:last-child').textContent = `$${total.toFixed(2)} MXN`;
    }
    
    // Funciones globales para los botones
    window.cambiarCantidad = function(id, cambio) {
        const itemIndex = carrito.findIndex(item => item.id === id);
        if (itemIndex !== -1) {
            carrito[itemIndex].cantidad += cambio;
            
            if (carrito[itemIndex].cantidad <= 0) {
                carrito.splice(itemIndex, 1);
            }
            
            localStorage.setItem('cart', JSON.stringify(carrito));
            renderizarCarrito();
        }
    };
    
    window.eliminarProducto = function(id) {
        carrito = carrito.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(carrito));
        renderizarCarrito();
    };
    
    // Inicializar
    renderizarCarrito();
});