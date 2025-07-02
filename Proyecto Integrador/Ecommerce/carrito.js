const carritoContainer = document.getElementById('carrito-container');
const finalizarBtn = document.getElementById('finalizar-compra');

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
renderCarrito();

function renderCarrito() {
  carritoContainer.innerHTML = '';
  if (carrito.length === 0) {
    carritoContainer.innerHTML = '<p>El carrito está vacío</p>';
    return;
  }
  carrito.forEach((producto, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${producto.thumbnail}" alt="${producto.title}">
      <h2>${producto.title}</h2>
      <p><strong>Precio:</strong> $${producto.price}</p>
      <button data-index="${index}">Eliminar</button>
    `;
    card.querySelector('button').addEventListener('click', () => eliminarDelCarrito(index));
    carritoContainer.appendChild(card);
  });
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  renderCarrito();
}

finalizarBtn.addEventListener('click', () => {
  if (carrito.length === 0) {
    alert('Tu carrito está vacío');
    return;
  }
  alert('¡Compra realizada con éxito!');
  localStorage.removeItem('carrito');
  carrito = [];
  renderCarrito();
});
