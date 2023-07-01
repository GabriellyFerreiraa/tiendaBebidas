document.addEventListener("DOMContentLoaded", () => {
  fetchData()
})

const fetchData = async () => {
  try {
    const res = await fetch('api.json')
    const data = await res.json()

    pintarProductos(data)
    detectarBotones(data)
  } catch (error) {
    console.log(error)
  }
}

const contendorProductos = document.querySelector('#contenedor-productos')

const pintarProductos = (data) => {
  const template = document.querySelector('#template-productos').content
  const fragment = document.createDocumentFragment()

  data.forEach(producto => {

    template.querySelector('img').setAttribute('src', producto.thumbnailUrl)
    template.querySelector('h5').textContent = producto.title
    template.querySelector('p span').textContent = producto.precio
    template.querySelector('button').dataset.id = producto.id
    const clone = template.cloneNode(true)
    fragment.appendChild(clone)
  })
  contendorProductos.appendChild(fragment)
}

let carrito = {}

const detectarBotones = (data) => {
  const botones = document.querySelectorAll('.card button')

  botones.forEach(btn => {
    btn.addEventListener('click', () => {

      const producto = data.find(item => item.id === parseInt(btn.dataset.id))
      producto.cantidad = 1
      if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
      }
      carrito[producto.id] = { ...producto }

      pintarCarrito()
    })
  })
}

const items = document.querySelector('#items')

const pintarCarrito = () => {

  items.innerHTML = ''

  const template = document.querySelector('#template-carrito').content
  const fragment = document.createDocumentFragment()

  Object.values(carrito).forEach(producto => {

    template.querySelector('th').textContent = producto.id
    template.querySelectorAll('td')[0].textContent = producto.title
    template.querySelectorAll('td')[1].textContent = producto.cantidad
    template.querySelector('span').textContent = producto.precio * producto.cantidad


    template.querySelector('.btn-success').dataset.id = producto.id
    template.querySelector('.btn-warning').dataset.id = producto.id

    const clone = template.cloneNode(true)
    fragment.appendChild(clone)
  })

  items.appendChild(fragment)

  pintarFooter()
  accionBotones()

}

const footer = document.querySelector('#footer-carrito')
const pintarFooter = () => {

  footer.innerHTML = ''

  if (Object.keys(carrito).length === 0) {
    footer.innerHTML = `
      <th scope="row" colspan="5">Carrito vacío</th>
      `
    return
  }

  const template = document.querySelector('#template-footer').content
  const fragment = document.createDocumentFragment()

 
  const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
  const nPrecio = Object.values(carrito).reduce((acc, { cantidad, precio }) => acc + cantidad * precio, 0)
 

  template.querySelectorAll('td')[0].textContent = nCantidad
  template.querySelector('span').textContent = nPrecio

  const clone = template.cloneNode(true)
  fragment.appendChild(clone)

  footer.appendChild(fragment)

  const finalizarPedido = document.querySelector('#finalizar-pedido')
  finalizarPedido.addEventListener('click',async () => {
    const { value: accept } = await Swal.fire({
      title: 'Confirmar edad: ',
      input: 'checkbox',
      inputValue: 1,
      inputPlaceholder:
        'Soy mayor de edad.',
      confirmButtonText:
        'Confirmar pedido <i class="fa fa-arrow-right"></i>',
      inputValidator: (result) => {
        return !result && 'No sos mayor de edad, NO podes seguir comprando!'
      }
    })
    
    if (accept) {
      const { value: text } = await Swal.fire({
        input: 'textarea',
        inputLabel: 'Por favor ingrese tu ubicación: (calle, altura, departamento)',
        inputPlaceholder: 'Escriba tu ubicación aqui...',
        inputAttributes: {
          'aria-label': 'Escriba tu ubicación aqui'
        },
        showCancelButton: true
      })
      if (text) {
        Swal.fire( 'Precio total: ' + nPrecio , 'Detalle de entrega: ' + text , 'success')
      }
    }
  })
  const boton = document.querySelector('#vaciar-carrito')
  boton.addEventListener('click', () => {
    carrito = {}
    pintarCarrito()
  })
}

const accionBotones = () => {
  const botonesAgregar = document.querySelectorAll('#items .btn-success')
  const botonesEliminar = document.querySelectorAll('#items .btn-warning')



  botonesAgregar.forEach(btn => {
    btn.addEventListener('click', () => {

      const producto = carrito[btn.dataset.id]
      producto.cantidad++
      carrito[btn.dataset.id] = { ...producto }
      pintarCarrito()
    })
  })

  botonesEliminar.forEach(btn => {
    btn.addEventListener('click', () => {

      const producto = carrito[btn.dataset.id]
      producto.cantidad--
      if (producto.cantidad === 0) {
        delete carrito[btn.dataset.id]
      } else {
        carrito[btn.dataset.id] = { ...producto }
      }
      pintarCarrito()
    })
  })
}

document.querySelector('.btn').addEventListener('click', function(btnEnviarFormulario) {
  btnEnviarFormulario.preventDefault(); 
  
  const email = document.getElementById('inputEmail4').value;
  const contraseña = document.getElementById('inputPassword4').value;
  const ubicacion = document.getElementById('inputAddress').value;
  const departamento = document.getElementById('inputAddress2').value;
  const detallesDely = document.getElementById('inputCity').value;
  const esAdulto = document.getElementById('gridCheck').checked;
  
  console.log('Email:', email);
  console.log('Contraseña:', contraseña);
  console.log('Ubicación:', ubicacion);
  console.log('Departamento:', departamento);
  console.log('Detalles de entrega:', detallesDely);
  console.log('Es adulto:', esAdulto);


  if (esAdulto) {
    Swal.fire({
      title: 'Confirmar formulario de cliente',
      text: "DETALLES DE CLIENTE: " + 
       ubicacion + " " + 
       departamento +
            "  | Detalles de entrega: " + detallesDely,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'CONFIRMADO!',
          'Formulario de cliente completado.',
          'success'
        )
      }
    })
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No sos mayor de edad!',
      footer: '<a href="./index.html">Volver</a>'
    })
  }
});