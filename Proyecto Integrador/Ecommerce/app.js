const container = document.getElementById('productos-container');
const contadorCarrito = document.getElementById('contador-carrito');

fetch('https://dummyjson.com/products/category/motorcycle')
  .then(res => res.json())
  .then(data => {
    data.products.forEach(producto => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <img src="${producto.thumbnail}" alt="${producto.title}">
        <h2>${producto.title}</h2>
        <p>${producto.description}</p>
        <p><strong>Precio:</strong> $${producto.price}</p>
        <button data-id="${producto.id}">Agregar al carrito</button>
      `;
      card.querySelector('button').addEventListener('click', () => agregarAlCarrito(producto));
      container.appendChild(card);
    });
  });

function agregarAlCarrito(producto) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito.push(producto);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarContador();
  alert(`${producto.title} agregado al carrito`);
}

function actualizarContador() {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  if (contadorCarrito) {
    contadorCarrito.textContent = carrito.length;
  }
}

// Inicializar contador al cargar
actualizarContador();