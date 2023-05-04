var shoppingCart = [];

function Product(nombre, precio) {
  this.name = nombre;
  this.price = precio;
}

function displayCarritoCompra() {
  var cartString = "Carrito :\n";

  for (var i = 0; i < carrito.length; i++) {
    cartString += (i + 1) + ". " + carrito[i].name + " - $" + carrito[i].price.toFixed(2) + "\n";
  }

  if (carrito.length === 0) {
    cartString += "Tu carrito esta vacio.";
  }

  alert(cartString);
}

function addCarrito() {
  var productoNombre = prompt("Ingrese el nombre del producto: ");
  var productoPrecio = parseFloat(prompt("Ingrese el precio del producto: "));

  var producto = new Product(productoNombre, productoPrecio);

  carrito.push(producto);

  alert("Producto agregado al carrito.");
}

function removerProducto() {
  var productoIndex = parseInt(prompt("Ingrese el producto que queres remover: ")) - 1;

  if (productoIndex >= 0 && productoIndex < carrito.length) {
    carrito.splice(producotIndex, 1);
    alert("Producto removido.");
  } else {
    alert("Producto invalido.");
  }
}

function calculateTotalPrecio() {
  var totalPrecio = 0;

  for (var i = 0; i < carrito.length; i++) {
    totalPrecio += carrito[i].price;
  }

  alert("Total precio: $" + totalPrecio.toFixed(2));
}

while (true) {
  var choice = prompt("Seleccione una opcion:\n1. Add un producto en el carrito\n2. Remover un producto del carrito\n3. Ver el carrito\n4. Calcular el precio\n5. Salir");

  if (choice === "1") {
    addCarrito();
  } else if (choice === "2") {
    removerProducto();
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