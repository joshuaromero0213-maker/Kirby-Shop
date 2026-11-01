document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleccionamos los elementos del DOM en receipt.html
    const itemsList = document.getElementById('items-list');
    const orderIdElement = document.getElementById('order-id');
    const dateElement = document.getElementById('date');
    const totalAmountElement = document.getElementById('total-amount');

    // 2. Leemos la lista de productos y el total guardado en localStorage
    const carritoIds = JSON.parse(localStorage.getItem('kirby_cart')) || [];
    const totalFinal = localStorage.getItem('kirby_total_final') || '0.00';

    // 3. Generamos un Order ID único dinámico (ejemplo: KB-59281)
    const randomOrderId = 'KB-' + Math.floor(10000 + Math.random() * 90000);
    if (orderIdElement) {
        orderIdElement.textContent = randomOrderId;
    }

    // 4. Formateamos la fecha actual (ejemplo: 01/11/2026)
    if (dateElement) {
        const hoy = new Date();
        const fechaFormateada = hoy.toLocaleDateString('es-CO', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        dateElement.textContent = fechaFormateada;
    }

    // 5. Asignamos el total acumulado
    if (totalAmountElement) {
        totalAmountElement.textContent = totalFinal;
    }

    // 6. Recorremos los productos para agregarlos a la lista del recibo
    if (itemsList) {
        itemsList.innerHTML = ''; // Limpiamos la lista previa

        if (carritoIds.length === 0) {
            itemsList.innerHTML = '<li>No hay productos en esta compra.</li>';
        } else {
            carritoIds.forEach((id) => {
                // Buscamos la info del producto en productsData (definido en main.js)
                const producto = typeof productsData !== 'undefined' ? productsData[id] : null;

                if (producto) {
                    const li = document.createElement('li');
                    li.style.display = 'flex';
                    li.style.justifyContent = 'space-between';
                    li.style.marginBottom = '8px';

                    li.innerHTML = `
                        <span><strong>${producto.name}</strong></span>
                        <span>${producto.price}</span>
                    `;
                    itemsList.appendChild(li);
                }
            });
        }
    }
});