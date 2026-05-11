const imageSearch = document.querySelector('#image-search');
const imageOrientacion = document.querySelector('#orientacion');
const botonImagen = document.querySelector('.boton');
const contenedorBotones = document.querySelector('#contenedorBotones')
const primeraCategoria = document.querySelector('#boton1')
const segundaCategoria = document.querySelector('#boton2')
const terceraCategoria = document.querySelector('#boton3')

const numberAPI = "fGhFoAuT6joFd5Xg1VpciXCPoGTi8Jgbanp1do5pSfXSlu1rzwBjPAi6";

const arrayTodascategorias = [primeraCategoria, segundaCategoria, terceraCategoria];



const boton = document.createElement("BUTTON")

boton.classList.add("boton")

const imagen = document.createElement("img")


const contenedorButton = document.getElementById("contenedorBotones")

const arrayCategorias = ["nature", "animals", "plants"];
//const arrayCategorias = [{id: "nature", name: "naturaleza"}, {id: "animals", name: "animales"}, {id: "plants", name: "plantas"}];
//const API_KEY = 'fGhFoAuT6joFd5Xg1VpciXCPoGTi8Jgbanp1do5pSfXSlu1rzwBjPAi6'







contenedorButton.append(boton)








//Crear 3 categorías de imágenes en la página de inicio


//VARIABLES

//Crear imágenes representantes de su categoría (con su contenedor)



//Meter en otros contenedores las fotos relacionadas de la API

//A cada uno de esos contenedores añadirle un botón que después permita añadir esa imagen a favoritos



/**Hay que adaptar lo del carrito de la compra para que el botón de añadir en el contenedor de la imagen añada esa imagen a favoritos */

const botonAñadir = document.createElement("button");
botonAñadir.textContent = '+';

primeraCategoria.append(botonAñadir);
segundaCategoria.append(botonAñadir);
terceraCategoria.append(botonAñadir);

contenedorBotones.append(primeraCategoria)
contenedorBotones.append(segundaCategoria)
contenedorBotones.append(terceraCategoria)



const agregarFavorito = favoritoElegido => {
  /*
    definimos el producto que cumplira la siguinete condición.
    En este caso, buscaremos en el array de los productos,
    el producto que cumpla la condición ----> (siguiente comentario)
  */
  const favoritoEncontrado = arrayProductos.find(producto => { 
    //el nombre del producto en la web y el producto elegido por el usuario coinciden 
    return producto.nombre === productoElegido 
  })

  if (typeof favoritoEncontrado === "undefined" )  { 
    //creamos el objeto con el producto nuevo.
    const favoritoNuevo = { nombre: favoritoElegido, cantidad: 1}
    //lo añadimos al final del array de los productos
    arrayProductos.push(favoritoNuevo);
    aniadirFila(favoritoNuevo);
  } else {
    favoritoEncontrado.cantidad += 1;
    seccionFavoritos.querySelector(`tr#${favoritoEncontrado.nombre}>td.celdaCantidad`).textContent = favoritoEncontrado.cantidad;
  }

  // almacenamos el valor de arrayProductos
  
  localStorage.setItem("arrayProductos", JSON.stringify(arrayProductos));

}

//EVENTOS

//Evento click en documento con imágenes para que aparezcan las fotos de cada categoria > click en una foto --(API Pexels)-->  aparecen las fotos de esa categoria 

document.addEventListener('click', (ev) => {
  const inputSearch = document.getElementById('image-search');





})

contenedorBotones.addEventListener('submit', (ev) => {





//Restar favorito de la sección de favoritos

  if (ev.target.matches('button')) {
    restarFavorito(ev.target.classList.value);
  }



})



//FUNCIONES

/**Obtener fotos con la URL general */

const getallImages = async (endpoint) => {
  try {

    const resp = await fetch(`https://api.pexels.com/v1/${endpoint}&per_page=1`, { headers: { "Authorization": numberAPI } });
    //console.log(resp)
    if (!resp.ok) {

      throw (resp.status);
    }
    const data = await resp.json();
    return data //la imagen que te devuelve tiene que tener un botón con la opción de sumar esa imágen a la seccion de favoritos
  }
  catch (error) {
    console.log(`Error ${error}`)
  }
}

// getallImages().then((categoria) => {
//   console.log("La categoria:", categoria);

// })

//arrayCategorias.forEach(categoria => { getallImages(categoria) });

/**Obtener fotos por id*/

//Función para que aparezcan las fotos de cada categoría al hacer click dividida en dos funciones:

//Función 1: La que se encarga de recoger el fetch 


const getallImagesporcategoria = async (categoria, index) => {

  arrayCategorias.forEach(async categoria => { 

  try {
    const resp2 = await fetch(`https://api.pexels.com/v1/search?query=${categoria}&per_page=1`, { headers: { "Authorization": numberAPI } })
    
  if (!resp2.ok) {

    throw (resp2.status);
  }
  const data = await resp2.json();
  console.log(data.photos)

  pintarFotos(arrayTodascategorias[index]);

  }
  catch (error) {
  console.log(`Error ${error}`)
}

})
  
}







//Función 2: La que pinte las fotos en el DOM ----> recibe el array de las fotos y las pinta


const pintarFotos = () => { }




/**Obtener fotos por orientación */

const getallImagespororientacion = async (orientacion) => {
  try {
    const resp2 = fetch(`https://api.pexels.com/v1/photos/${orientacion}`)
  if (!resp.ok) {

    throw (resp.status);
  }
  const data = await resp.json();
  return data //The current supported orientations are: landscape, portrait or square. orientacionImagen = img.orientation
  }
  catch (error) {
  console.log(`Error ${error}`)
}
  
}

arrayCategorias.forEach(orientacion => { getallImages(orientacion) });



boton.append(getallImages)

console.log(getallImages)








//Función para guardar los favoritos en el localStorage


function guardarFavoritos(favorito) {
  localStorage.setItem("favorito", JSON.stringify(favorito));
}

const favoritosGuardados = JSON.parse(localStorage.getItem("favoritos"))



//Función para poder eliminar las imágenes de la sección de favoritos 

const eliminarFavorito = () => {
  //imagenAñadidapreviamente.remove(). 
}



//Saver para que las fotos persistan incluso aunque se cierre la página











getallImagesporcategoria();