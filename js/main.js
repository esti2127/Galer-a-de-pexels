const imageSearch = document.querySelector('#image-search');
const imageOrientacion = document.querySelector('#orientacion');
const botonImagen = document.querySelector('.boton');



const boton = document.createElement("BUTTON")

boton.classList.add("boton")

const imagen = document.createElement("img")


const contenedorButton = document.getElementById("contenedorBotones")

const arrayCategorias = ["naturaleza", "animales", "plantas"];
//const API_KEY = 'fGhFoAuT6joFd5Xg1VpciXCPoGTi8Jgbanp1do5pSfXSlu1rzwBjPAi6'







contenedorButton.append(boton)

//Crear 3 categorías de imágenes en la página de inicio


//VARIABLES

//Crear imágenes representantes de su categoría (con su contenedor)



//Meter en otros contenedores las fotos relacionadas de la API

//A cada uno de esos contenedores añadirle un botón que después permita añadir esa imagen a favoritos

//EVENTOS

//Evento click en documento con imágenes para que aparezcan las fotos de cada categoria > click en una foto --(API Pexels)-->  aparecen las fotos de esa categoria 

document.addEventListener('click', () => {
  const inputSearch = document.getElementById('image-search');

 

})



//FUNCIONES

const getallImages = async (endpoint) => {
  try {

    const resp = fetch(`https://api.pexels.com/v1/${endpoint}`, {headers: {"Authorization": "fGhFoAuT6joFd5Xg1VpciXCPoGTi8Jgbanp1do5pSfXSlu1rzwBjPAi6"}});
    if (!resp.ok) {
        
            throw (resp.status);
        }
    const data = await resp.json();
    return data
  }
  catch(error){
    console.log(`Error ${error}`)
  }
}

getallImages().then((categoria) => {
    console.log("La categoria:", categoria);

})

arrayCategorias.forEach(categoria => {getallImages(categoria)});


boton.append(getallImages)


//Función para que aparezcan las fotos de cada categoría al hacer click dividida en dos funciones:

//Función 1: La que se encarga de recoger el fetch 

//Función 2: La que pinte las fotos en el DOM ----> recibe el array de las fotos y las pinta

//Función para guardar los favoritos en el localStorage

//Función para poder eliminar las imágenes de la sección de favoritos 



//Saver para que las fotos persistan incluso aunque se cierre la página

