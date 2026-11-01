document.addEventListener('DOMContentLoaded', () => {
  const searchParams = new URLSearchParams(window.location.search);
  const productId = searchParams.get('id');

  const product = typeof productsData !== 'undefined' ? productsData[productId] : null;

  if (product) {

    const imagePath = product.image.startsWith('../') ? product.image : '../' + product.image;
    
    document.getElementById('detail-image').src = imagePath;
    document.getElementById('detail-image').alt = product.name;
    document.getElementById('detail-title').textContent = product.name;
    document.getElementById('detail-price').textContent = product.price;
    document.getElementById('detail-description').textContent = product.description;

    const btnBuyDetail = document.getElementById('btn-buy-detail');
    if (btnBuyDetail) {
        btnBuyDetail.addEventListener('click', () => {
            agregarAlCarrito(productId);
        });
    }
  } else {
    document.querySelector('.product-detail-card').innerHTML = '<h2>Producto no encontrado</h2>';
  }
});