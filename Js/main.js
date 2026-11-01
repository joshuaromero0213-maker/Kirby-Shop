const productsData = {
  'kirby-classic': {
    name: 'Kirby classic',
    price: '$9.99',
    image: 'img/KXC2-N4N1475293-medium_w640_h480_q75-peluchekirby1-1705939067.png',
    description: 'Classic Kirby plush made of ultra-soft material—perfect for cuddling or decorating your gaming space..'
  },
  'kirby': {
    name: 'Chill Kirby',
    price: '$4.99',
    image: 'img/ChatGPT-Image-Sep-25-2026-04_35_26-PM.png',
    description: 'Special edition of sleeping Kirby—perfect for cuddling or decorating your gaming space.'
  },
  'sleeping-kirby': {
    name: 'Cooking Kirby',
    price: '$9.99',
    image: 'img/images.jpeg',
    description: 'Special edition of mini Kirby—perfect for cuddling or decorating your gaming space.'
  },
  'biggie-kirby': {
    name: 'Big Kirby',
    price: '$19.99',
    image: 'img/biggie.jpeg',
    description: 'Special edition of big Kirby—perfect for cuddling or decorating your gaming space.'
  },
  'kirby-controller': {
    name: 'Kirby Controller',
    price: '$44.99',
    image: 'img/controller.jpg',
    description: 'Kirby controller perfect for holding your gaming controller.'
  },
  'Mini Kirby': {
    name: 'Llavero Peluche Kirby',
    price: '$19.99',
    image: 'img/llavero.jpeg',
    description: 'Mini Kirby plush with keychain attachment.'
  },
  'Kirby': {
    name: 'Lámpara Mesa Kirby',
    price: '$19.99',
    image: 'img/mesa.webp',
    description: 'Kirby-themed table lamp with adjustable brightness and color settings.'
  },
  'Kirby Key Ring': {
    name: 'Llavero Metal Kirby',
    price: '$19.99',
    image: 'img/llave.jpeg',
    description: 'Mini Kirby plush with keychain attachment.'
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