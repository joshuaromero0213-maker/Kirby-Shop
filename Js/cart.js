document.addEventListener('DOMContentLoaded', () => {
    const btnCatalog = document.getElementById('btn-catalog');
    const catalogMenu = document.getElementById('catalog-menu');

    btnCatalog.addEventListener('click', (e) => {
        e.stopPropagation();
        catalogMenu.classList.toggle('active');
    });
document.addEventListener('click', (e) => {
    if (!catalogMenu.contains(e.target) && e.target !== btnCatalog) {
      catalogMenu.classList.remove('active');
    }
  });


const contenedorItems = document.getElementById('cart-items');
const elementoTotal = document.getElementById('cart-total');
const btnCheckout = document.getElementById('checkout-button');

const carritoIds = JSON.parse(localStorage.getItem('kirby_cart')) || [];
let totalAcomulado =0;
if(carritoIds.length === 0){
    contenedorItems.innerHTML='<p style="text-align:center;">Tu carrito está vacío 🛒</p>';
    elementoTotal.textContent = '0.00';
}else{
    contenedorItems.innerHTML = '';
    carritoIds.forEach((id,index) => {
        const producto = typeof productsData !== 'undefined' ? productsData[id] : null;
        if(producto){
            const precioNumero = parseFloat(producto.price.replace('$', ''));
            totalAcomulado += precioNumero;
            contenedorItems.innerHTML += `
            <div class="cart-item">
                <img src="${producto.image}" alt="${producto.name}">
                <div class="cart-item-details">
                    <h3>${producto.name}</h3>
                    <p>${producto.description}</p>
                    <p>Precio: ${producto.price}</p>
                </div>
                <button class="remove-btn" data-index="${index}">Eliminar</button>
            </div>
            `;
        }
    });

    // Delete button functionality
    const removeButtons = document.querySelectorAll('.remove-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                removeItemFromCart(index);
            });
        });


    elementoTotal.textContent = totalAcomulado.toFixed(2);
    if (btnCheckout) {
        btnCheckout.addEventListener('click', () => {
            if(carritoIds.length === 0){
                alert('Tu carrito está vacío. Agrega productos antes de proceder al pago.');
                return;
            }
            localStorage.setItem('kirby_total_final', totalAcomulado.toFixed(2));
            window.location.href = 'receipt.html';
        });
    }
}
function removeItemFromCart(index) {
    const carritoIds = JSON.parse(localStorage.getItem('kirby_cart')) || [];
    carritoIds.splice(index, 1);
    localStorage.setItem('kirby_cart', JSON.stringify(carritoIds));
    location.reload();
}

});

