var carrito = [];

function Product(nombre, precio) {
  this.nombre = nombre;
  this.precio = precio;
}

function displayCarritoCompra() {
  var carritoString = "Carrito :\n";

  for (var i = 0; i < carrito.length; i++) {
    carritoString += (i + 1) + ". " + carrito[i].nombre + " - $" + carrito[i].precio.toFixed(2) + "\n";
  }

  if (carrito.length === 0) {
    carritoString += "Tu carrito esta vacio.";
  }

  alert(carritoString);
}

function addCarrito() {
  var productoNombre = prompt("Ingrese el nombre del producto: ");
  var productoPrecio = parseFloat(prompt("Ingrese el precio del producto: "));

  var product = new Product(productoNombre, productoPrecio);

  carrito.push(product);

  alert("Producto agregado al carrito.");
}

function removerCarrito() {
  var productoIndex = parseInt(prompt("Ingrese la posicion del producto que queres remover: ")) - 1;

  if (productoIndex >= 0 && productoIndex < carrito.length) {
    carrito.splice(productoIndex, 1);
    alert("Producto removido del carrito.");
  } else {
    alert("Numero del producto no válido.");
  }
}

function calculateTotalPrecio() {
  var totalPrecio = 0;

  for (var i = 0; i < carrito.length; i++) {
    totalPrecio += carrito[i].precio;
  }

  alert("Total price: $" + totalPrecio.toFixed(2));
}

while (true) {
  var choice = prompt("Elige una opcion:\n1. Add el producto en el carrito\n2. Remover el producto del carrito\n3. Ver productos del carrito\n4. Calcular precio total\n5. Exit");

  if (choice === "1") {
    addCarrito();
  } else if (choice === "2") {
    removerCarrito();
  } else if (choice === "3") {
    displayCarritoCompra();
  } else if (choice === "4") {
    calculateTotalPrecio();
  } else if (choice === "5") {
    break;
  } else {
    alert("Elección no válida. Inténtalo de nuevo.");
  }
}
