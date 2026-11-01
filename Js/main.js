const productsData = {
  'kirby-classic': {
    name: 'Kirby-classic',
    price: '$9.99',
    image: 'img/KXC2-N4N1475293-medium_w640_h480_q75-peluchekirby1-1705939067.png',
    description: 'Peluche clásico de Kirby de material ultrasuave, ideal para abrazar o decorar tu espacio gamer.'
  },
  'kirby': {
    name: 'Peluche Kirby Durmiendo',
    price: '$4.99',
    image: 'img/ChatGPT-Image-Sep-25-2026-04_35_26-PM.png',
    description: 'Edición especial de Kirby durmiendo placenteramente. Tamaño compacto para escritorio.'
  },
  'sleeping-kirby': {
    name: 'Peluche Kirby Mini',
    price: '$9.99',
    image: 'img/images.jpeg',
    description: 'Versión mini coleccionable de alta densidad, resistente a caídas y muy suave al tacto.'
  },
  'biggie-kirby': {
    name: 'Peluche Kirby Gigante',
    price: '$19.99',
    image: 'img/biggie.jpeg',
    description: 'Edición Biggie de gran tamaño. Funciona perfectamente como cojín o pieza central de colección.'
  },
  'kirby-controller': {
    name: 'Soporte Kirby Controller',
    price: '$44.99',
    image: 'img/controller.jpg',
    description: 'Soporte funcional diseñado para sostener tus mandos de consola o smartphone con los brazos de Kirby.'
  },
  'llavero-kirby': {
    name: 'Llavero Peluche Kirby',
    price: '$19.99',
    image: 'img/llavero.jpeg',
    description: 'Llavero con gancho metálico reforzado y minipeluche incorporado.'
  },
  'mesa-kirby': {
    name: 'Lámpara Mesa Kirby',
    price: '$19.99',
    image: 'img/mesa.webp',
    description: 'Lámpara nocturna tenue con figura de Kirby, luz LED de bajo consumo recargable por USB.'
  },
  'llave-kirby': {
    name: 'Llavero Metal Kirby',
    price: '$19.99',
    image: 'img/llave.jpeg',
    description: 'Llavero de aleación metálica con acabado esmaltado de alta durabilidad.'
  }
};

function agregarAlCarrito(productId) {
  let carrito = JSON.parse(localStorage.getItem('kirby_cart')) || [];
  carrito.push(productId);
  localStorage.setItem('kirby_cart', JSON.stringify(carrito));
  alert('Producto agregado al carrito');
}
document.addEventListener('DOMContentLoaded', () => {
  const btnCatalog = document.getElementById('btn-catalog');
  const catalogMenu = document.getElementById('catalog-menu');
  if(btnCatalog && catalogMenu){
    btnCatalog.addEventListener('click', (e) => {
      e.stopPropagation();
      catalogMenu.classList.toggle('active');
    });
    document.addEventListener('click', (e) => {
      if (!catalogMenu.contains(e.target) && e.target !== btnCatalog) {
        catalogMenu.classList.remove('active');
      }
    });
  }
  const tarjetasProductos = document.querySelectorAll('.product--list');
  tarjetasProductos.forEach(tarjeta => {
    const productId = tarjeta.getAttribute('data-product-id');
    const btnComprar = tarjeta.querySelector('.buybtn');
    if(btnComprar){
      btnComprar.addEventListener('click', () => {
        agregarAlCarrito(productId);
      });
    }
  });
});