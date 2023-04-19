const product = [
   {
       id: 0,
       imagen: 'imagen/gg-1.jpg',
       titulo: 'Absolut Vodka',
       precio: 3019,
   },
   {
       id: 1,
       imagen: 'imagen/hh-2.jpg',
       titulo: 'Jack Daniels',
       precio: 9606,
   },
   {
       id: 2,
       imagen: 'imagen/ee-3.jpg',
       titulo: 'Bombay Sapphire ',
       precio: 6000,
   },
   {
       id: 3,
       imagen: 'imagen/aa-1.jpg',
       titulo: 'Tanqueray',
       precio: 5994,
   }
];
const categories = [...new Set(product.map((item)=>
   {return item}))]
   let i=0;
document.getElementById('root').innerHTML = categories.map((item)=>
{
   var {imagen, titulo, precio} = item;
   return(
       `<div class='box'>
           <div class='img-box'>
               <img class='images' src=${imagen}></img>
           </div>
       <div class='bottom'>
       <p>${titulo}</p>
       <h2>$ ${precio}.00</h2>`+
       "<button onclick='addtocart("+(i++)+")'>Agregar al carrito</button>"+
       `</div>
       </div>`
   )
}).join('')

var cart =[];

function addtocart(a){
   cart.push({...categories[a]});
   displaycart();
}
function delElement(a){
   cart.splice(a, 1);
   displaycart();
}

function displaycart(){
   let j = 0, total=0;
   document.getElementById("count").innerHTML=cart.length;
   if(cart.length==0){
       document.getElementById('cartItem').innerHTML = "Tu carrito esta vacio";
       document.getElementById("total").innerHTML = "$ "+0+".00";
   }
   else{
       document.getElementById("cartItem").innerHTML = cart.map((items)=>
       {
           var {imagen, titulo, precio} = items;
           total=total+precio;
           document.getElementById("total").innerHTML = "$ "+total+".00";
           return(
               `<div class='cart-item'>
               <div class='row-img'>
                   <img class='rowimg' src=${imagen}>
               </div>
               <p style='font-size:12px;'>${titulo}</p>
               <h2 style='font-size: 15px;'>$ ${precio}.00</h2>`+
               "<i class='fa-solid fa-trash' onclick='delElement("+ (j++) +")'></i></div>"
           );
       }).join('');
   }

   
}
