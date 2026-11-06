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

const cart = JSON.parse(localStorage.getItem('kirby_cart')) || [];
let totalAcomulado = 0;

if (cart.length === 0) {
    contenedorItems.innerHTML = '<p style="text-align:center;">Your cart is empty 🛒</p>';
    elementoTotal.textContent = '0.00';
} else {
    contenedorItems.innerHTML = '';

    cart.forEach((item, index) => {
        // Leemos id y cantidad directamente del objeto
        const id = typeof item === 'object' ? item.id : item;
        const cantidad = typeof item === 'object' ? item.quantity : 1;

        const producto = typeof productsData !== 'undefined' ? productsData[id] : null;

        if (producto) {
            const precioNumero = parseFloat(producto.price.replace('$', ''));
            const subtotal = precioNumero * cantidad;
            totalAcomulado += subtotal;

            const imagePath = producto.image.startsWith('../') ? producto.image : '../' + producto.image;

            contenedorItems.innerHTML += `
                <div class="cart-item">
                    <img src="${imagePath}" alt="${producto.name}">
                    <div class="cart-item-details">
                        <h3>${producto.name}</h3>
                        <p>${producto.description}</p>
                        <p>Precio: ${producto.price} x ${cantidad} = $${subtotal.toFixed(2)}</p>
                    </div>
                    <button class="remove-btn" data-index="${index}">Delete</button>
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
            if(cart.length === 0){
                alert('Your cart is empty. Please add items before proceeding to checkout.');
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

function addToCart(productId) {
    
    let cart = JSON.parse(localStorage.getItem('kirby_cart')) || [];

  
    cart = cart.map(item => typeof item === 'object' ? item : { id: item, quantity: 1 });

    
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity += 1; 
    } else {
        cart.push({ id: productId, quantity: 1 }); 
    }

   
    localStorage.setItem('kirby_cart', JSON.stringify(cart));
}
});
