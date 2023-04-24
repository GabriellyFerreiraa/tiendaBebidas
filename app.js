let carrito = []; 

// Solicitar al usuario que ingrese productos y precios hasta que escriba "finalizar" para finalizar el proceso.
while (true) {
  let item = prompt("Ingrese algun producto (o escriba 'finalizar' para finalizar):");
  if (item === "finalizar") {
    break;
  }
  let precio = parseFloat(prompt("Ingrese el precio de " + item + ":")); 
  carrito.push({ item: item, precio: precio });
}

// Calcular el costo total de los productos en el carrito de compras
let total = 0;
for (let i = 0; i < carrito.length; i++) {
  total += carrito[i].precio;
}

// Mostrar el carrito de compras y el costo total
let agregadoCarrito = "Tu carrito:\n";
for (let i = 0; i < carrito.length; i++) {
    agregadoCarrito += carrito[i].item + " - $" + carrito[i].precio.toFixed(2) + "\n";
}
agregadoCarrito += "Total cost: $" + total.toFixed(2);

console.log(agregadoCarrito);
alert(agregadoCarrito);
