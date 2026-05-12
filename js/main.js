//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//VARIABLES
const keyAPI = "fGhFoAuT6joFd5Xg1VpciXCPoGTi8Jgbanp1do5pSfXSlu1rzwBjPAi6";
const urlAPI = "https://api.pexels.com/v1/";
const formSearch = document.querySelector('#formSearch');
const imageSearch = document.querySelector('#imageSearch');
const imageOrientacion = document.querySelector('#orientacion');
const contenedorBotones = document.querySelector('#contenedorBotones')
const contenedorFotos = document.querySelector('#galeriaFotos');
const menuPaginacion = document.querySelector('#paginacion');
const contenedorImagenes = document.getElementById("mostrarImagenes")
const boton = document.createElement("BUTTON")
const imagen = document.createElement("img")
const contenedorButton = document.getElementById("contenedorBotones")
const arrayCategorias = ["nature", "animals", "plants"];
const arrayOrientacion = ["landscape", "portrait"];

//Crear 3 categorías de imágenes en la página de inicio


//VARIABLES


//EVENTOS

document.addEventListener('click', async (event) => {
    const boton = event.target.closest('.boton');
    if (boton){    
    const categoria = boton.dataset.categoria;
        try {
            const fotos = await getAllImages(categoria);
            mostrarImagenes(fotos);
            if (fotos){
                mostrarImagenes(fotos);
            }
        }
        catch(Error){
            console.log("Error")
        }
    }
});

document.addEventListener('click', async (event)=>{
  const botonBuscar = event.target.closest('.botonBuscar');
  if (botonBuscar){
    
  }
})


//Crear imágenes representantes de su categoría (con su contenedor)



//Meter en otros contenedores las fotos relacionadas de la API

//A cada uno de esos contenedores añadirle un botón que después permita añadir esa imagen a favoritos



/**Hay que adaptar lo del carrito de la compra para que el botón de añadir en el contenedor de la imagen añada esa imagen a favoritos */

const getAllImages = async (categoria, orientation = "landscape") => {
    try {
        const resp = await fetch(`https://api.pexels.com/v1/search?query=${categoria}&per_page=8`, {
            headers: {
                "Authorization": keyAPI
            }
        });
        if (!resp.ok) {
            throw (`Error: ${resp.status}`)
        }

        const data = await resp.json();
        return data.photos;
    }

    catch (error) {
        console.log(`Error:${error}`)
    }
};

const pintarBoton = async (categoria) => {
    contenedorBotones.innerHTML = "";
    for (const categoria of arrayCategorias) {
        const btn = document.createElement('button')
        btn.classList.add('boton')
        btn.dataset.categoria= categoria;
        const imagenBoton = document.createElement('img')
        const imagenes = await getAllImages(categoria);
        if (imagenes.length > 0) {
            imagenBoton.src = imagenes[0].src.small;//trycatch  
        }
        const nombreCategoria = document.createElement('p');
        nombreCategoria.innerHTML = categoria;
        btn.append(imagenBoton)
        btn.append(nombreCategoria)
        contenedorBotones.append(btn)
    }
};


pintarBoton();


const mostrarImagenes = (listaFotos = []) => {
    contenedorImagenes.innerHTML = "";
    try {
        for (const foto of listaFotos) {
            const nuevaImagen = document.createElement('img');
            nuevaImagen.src = foto.src.medium;
            nuevaImagen.alt = foto.alt || "Imagen";
            contenedorImagenes.append(nuevaImagen)
        }
        console.log("Entra en try")
    }
    catch (Error) {
        console.log("Error") 
    }
};

mostrarImagenes();

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

  if (typeof favoritoEncontrado === "undefined") {
    //creamos el objeto con el producto nuevo.
    const favoritoNuevo = { nombre: favoritoElegido, cantidad: 1 }
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


function eliminarFavorito(imagen) {
    //creamos constate donde almacenamosla funcion encargada de buscar el indice y eliminarlo
    const indice = productos.findIndex(imagen => imagen.nombre === nombre);
    if (indice !== -1) {
        productos.splice(indice, 1);
        localStorage.setItem("productos", JSON.stringify(productos));
        pintarTabla();
    }
}

function limpiarTabla() {

}


//Saver para que las fotos persistan incluso aunque se cierre la página

//EVENTOS

//Evento click en documento con imágenes para que aparezcan las fotos de cada categoria > click en una foto --(API Pexels)-->  aparecen las fotos de esa categoria 


//FUNCIONES

/**Obtener fotos con la URL general */

const fetchImagenes = async function (orientation) {
    // const apiKey = 'TU_API_KEY'; // Reemplazar con clave real (ej. Unsplash)
    // let url = `https://unsplash.com{apiKey}`;
    
    // Añadir parámetro de orientación si no es 'all'
    if (orientation !== 'all') {
        url += `&orientation=${orientation}`;
    }

    // const response = await fetch(url);
    // if (!response.ok) throw new Error('Error al obtener imágenes');
    // return await response.json();
}

const imgOrientacion = async function (orientation) {
    const container = document.getElementById('contenedorBotones');
    container.innerHTML = '';

    try {
      const resp = await fetch(`https://api.pexels.com/v1/search?query=${endpoint}&orientation=${orientation}&per_page=1`, {
      headers: { "Authorization": keyAPI }

    });

    if(!resp.ok) {

      throw (`Error:${resp.status}`);

    }

    const data = await resp.json();

      const images = await fetchImages(orientation);
      
      container.innerHTML = '';
      data.forEach(img => {
          const imgElement = document.createElement('img');
          imgElement.src = img.urls.small;
          container.append(imgElement);
      });
    } catch (error) {
        container.innerHTML = 'Error al cargar las imágenes';
        console.error(error);
    }
}

const pintarporOrientacion = async (orientacion) => {
  contenedorBotones.innerHTML = "";
try{
    for (const orientacion of arrayOrientacion) { 
    const imagenOrientacion = document.createElement('img')
    const imagenesOrientacion = await getallImages(orientation);
    if (imagenes.length > 0) {
      imagenBoton.src = imagenes[0].src.small;
    }
    const nombreOrientacion = document.createElement('p');
    nombreOrientacion.innerHTML = orientacion;

  }}catch (error){
  throw error;
}
};

/**Función para guardar los favoritos en el localStorage*/

function guardarFavoritos(favorito) {
  localStorage.setItem("favorito", JSON.stringify(favorito));
}

/**Recuperar objeto de favoritos del Local Storage */
const favoritosGuardados = JSON.parse(localStorage.getItem("favoritos"))

//Saver para que las fotos persistan incluso aunque se cierre la página

