//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//VARIABLES
const keyAPI = "fGhFoAuT6joFd5Xg1VpciXCPoGTi8Jgbanp1do5pSfXSlu1rzwBjPAi6";

const arrayCategorias = ["nature", "animals", "plants"];

const contenedorBotones = document.querySelector('#contenedorBotones')
const contenedorImagenes = document.getElementById("mostrarImagenes")


const botonFiltrar = document.getElementById('imagenesOrientacion');
const selectOrientacion = document.getElementById('orientacion');

const botonBuscarManual = document.getElementById('botonBuscar');
const inputBusqueda = document.getElementById('entradaBusqueda');

/**Asignamos un valor inicial para la categoría para que, en caso de que el usuario filtre nada más entrar en la web sin haber elegido una categoría, la web no de error y y tenga algo que mostrar, en este caso, las imagenes de la categoria "nature" */

let categoriaActual = "nature";


// const formSearch = document.querySelector('#formSearch');
// const imageSearch = document.querySelector('#imageSearch');


// const contenedorFotos = document.querySelector('#galeriaFotos');
// const menuPaginacion = document.querySelector('#paginacion');

// const boton = document.createElement("BUTTON")
// const imagen = document.createElement("img")
// const contenedorButton = document.getElementById("contenedorBotones")

// const arrayOrientacion = ["landscape", "portrait"];

//EVENTOS

////////////////////////EVENTO CLICK 3 BOTONES CATEGORIAS PRINCIPALES////////////////////////

document.addEventListener('click', async (event) => {

  /**¿Lo qué he clickado es o está cerca de un botón? ----> */
  if (event.target.closest('.boton')) {
    /**Lee la query que le hemos añadido al botón (ejemplo:nature) */
    const categoria = boton.dataset.categoria;

    categoriaActual = categoria;
    
    try {
      /**Llama a la función getallImages para traer las 8 fotos de la categoría */
      const fotos = await getAllImages(categoria);
      /**Llama a la función mostrarImagenes que pinta las 8 imagenes */
      mostrarImagenes(fotos);
      
    }
    catch (Error) {
      console.log("Error al cargar la galería de la categoría")
    }
  }







   const target = event.target;
  if (target.id === 'botonFavoritos') {
    verMisFavoritos();
    return;
  }
  if (target.classList.contains('btn-fav')) {
    const fotoData = JSON.parse(target.dataset.fotoInfo);
    agregarFavorito(fotoData); // <-- Mira que aquí tenga la "r"
    return;
  }
  if (target.classList.contains('btn-delete')) {
    const fotoData = JSON.parse(target.dataset.fotoInfo);
    eliminarFavorito(fotoData);
    return;
  }
  if (target.closest('.botonBuscar') || (target.tagName === 'BUTTON' && target.parentElement.id === 'contenedorSearch')) {
    const input = document.getElementById('entradaBusqueda');
    const valor = input.value.trim();

    if (valor) {
      console.log("Buscando:", valor);
      const resultados = await getAllImages(valor);
      mostrarImagenes(resultados);
    }
    return;
  }
  const btnCat = target.closest('.boton');
  if (btnCat) {
    const cat = btnCat.dataset.categoria;
    console.log("Categoría pulsada:", cat);
    const resultados = await getAllImages(cat);
    mostrarImagenes(resultados);
  }
});


//////////////////////// EVENTO FILTRAR POR ORIENTACIÓN ////////////////////////


botonFiltrar.addEventListener('click', async(event) => {

  /**Evitamos que la página se recargue */
  event.preventDefault();
  /**Leemos lo que el usuario ha marcado en el desplegable (horizontal, vertical, todas) */
  const orientacionElegida = selectOrientacion.value;

  // console.log(`Filtrando ${categoriaActual} por orientación: ${orientacionElegida}`);

  try {
      const fotos = await getAllImages(categoriaActual, orientacionElegida);
      /**Si tenemos fotos */
      if (fotos) {
        /**Pinta las nuevas imagenes filtradas */
          mostrarImagenes(fotos);
      }
  } catch (error) {
      console.error("Error al filtrar por orientación:", error);
  }

});






////////////////////////EVENTO CLICK BUSCADOR MANUAL////////////////////////

botonBuscarManual.addEventListener('click', async () => {
    /**Captura la búsqueda del usuario */
    const nuevaPalabra = inputBusqueda.value;
    /**Verificamos que el buscador no está vacío */
    if (nuevaPalabra) {
      /**Actualizamos la categoría que se busca */
        categoriaActual = nuevaPalabra;
      try{
        /**Pedimos las fotos de la nueva palabra */
        const fotos = await getAllImages(nuevaPalabra);
        if(fotos){
          /**Pinta los resultados de la búsqueda */
          mostrarImagenes(fotos);
        }
      }catch(error){
        console.error("Error en la búsqueda manual:", error);
      }
      
    }
});





//Crear imágenes representantes de su categoría (con su contenedor)



//Meter en otros contenedores las fotos relacionadas de la API

//A cada uno de esos contenedores añadirle un botón que después permita añadir esa imagen a favoritos



////////////////////////FUNCIÓN FOTOS API PEXELS SEGÚN CATEGORÍA Y ORIENTACIÓN////////////////////////

/**La orientacion por defecto será "all" */
const getAllImages = async (query, orientation = "all") => {
  try {

    /**Creamos la URL básica con la categoría elegida */

    let url = `https://api.pexels.com/v1/search?query=${query}&per_page=8`;

    /**Y si el usuario ha elegido una orientación diferente a la predeterminada la añadimos a la url para que aparezcan las imagenenes filtradas por orientacion y por categoría */

    if (orientation !== "all") {
      url += `&orientation=${orientation}`;
    }
    /**. Fetch realiza la petición. Sin el pase VIP (nuestra API) Pexels no nos deja ver las fotos */
    const resp = await fetch(url, {
      headers: { "Authorization": keyAPI }
    });

    if (!resp.ok) {
      throw (`Error: ${resp.status}`)
    }

    /**Pasamos la respuesta a un objeto legible */

    const data = await resp.json();

    /**Queremos el array con las fotos, no todo el objeto */
    return data.photos;
  }

  catch (error) {
    console.log(`Error:${error}`)
  }
};





////////////////////////FUNCIÓN PINTAR BOTONES FOTOS API PEXELS SEGÚN CATEGORÍA Y ORIENTACIÓN////////////////////////

const pintarBoton = async () => {
  contenedorBotones.innerHTML = "";

  /**por cada categoría en el arrayCategorias haz lo siguiente: (se ejecutará 3 veces, porque hay 3 categorías en el array) */

  for (const categoria of arrayCategorias) {

    /**Crea un botón */
    const btn = document.createElement('button')
    /**Crea una imagen */
    const imagenBoton = document.createElement('img')
    /**Crea una etiqueta span para poner el nombre de la categoría */
    const texto = document.createElement('span');

    /**con await la función se detiene hasta que getallImages le pase fotos de la categoría correspondiente. Las fotos se guardan en la variable "imagenes" */

    const imagenes = await getAllImages(categoria);

    /**Si la lista no está vacía... (si la función devolvió fotos...) */
    if (imagenes.length > 0) {

      /**Tomamos la primera foto de la lista y nos quedamos con su ruta para ponérsela a nuestra imagen */
      imagenBoton.src = imagenes[0].src.medium;
    }

    /**Escribímos el nombre de la categoría dentro de span */

    texto.textContent = categoria;

    /**Metemos la imagen y el nombre de la categoría dentro del botón */
    btn.append(imagenBoton);
    btn.append(texto);
    /**Le añadimos al botón la query correspondiente (ejemplo:nature) */
    btn.dataset.categoria = categoria;
    btn.classList.add('boton')

    /**Metemos el botón en el contenedor de HTML para que se pueda ver en pantalla */

    contenedorBotones.append(btn);

  }
};


////////////////////////LLAMADA A LA FUNCIÓN PINTARBOTON()////////////////////////

pintarBoton();















const mostrarImagenes = (listaFotos = [], esFavorito = false) => {
  const contenedor = document.getElementById('mostrarImagenes');
  if (!contenedor) return;
  contenedorImagenes.innerHTML = "";
  listaFotos.forEach(foto => {
    try {
      const cajaImagen = document.createElement("div");
      cajaImagen.classList.add("caja-foto");

      const nuevaImagen = document.createElement('img');
      nuevaImagen.src = foto.src?.medium;
      nuevaImagen.alt = foto.alt;
      nuevaImagen.classList.add("FotoGaleria");
      const btnAccion = document.createElement("button");
      if (esFavorito) {
        btnAccion.textContent = "X";
        btnAccion.classList.add("btn-delete");
      } else {
        btnAccion.textContent = "+";
        btnAccion.classList.add("btn-fav");
      }
      btnAccion.dataset.fotoInfo = JSON.stringify(foto);
      cajaImagen.append(nuevaImagen, btnAccion);
      contenedor.append(cajaImagen);
    } catch (error) {
      console.log("Error al crear imagen individual");
    }
  });

};

mostrarImagenes();


// const agregarFavorito = favoritoElegido => {
//   /*
//     definimos el producto que cumplira la siguinete condición.
//     En este caso, buscaremos en el array de los productos,
//     el producto que cumpla la condición ----> (siguiente comentario)
//   */
//   const favoritoEncontrado = arrayProductos.find(producto => {
//     //el nombre del producto en la web y el producto elegido por el usuario coinciden 
//     return producto.nombre === productoElegido
//   })

//   if (typeof favoritoEncontrado === "undefined") {
//     //creamos el objeto con el producto nuevo.
//     const favoritoNuevo = { nombre: favoritoElegido, cantidad: 1 }
//     //lo añadimos al final del array de los productos
//     arrayProductos.push(favoritoNuevo);
//     aniadirFila(favoritoNuevo);
//   } else {
//     favoritoEncontrado.cantidad += 1;
//     seccionFavoritos.querySelector(`tr#${favoritoEncontrado.nombre}>td.celdaCantidad`).textContent = favoritoEncontrado.cantidad;
//   }

//   // almacenamos el valor de arrayProductos

//   localStorage.setItem("arrayProductos", JSON.stringify(arrayProductos));

// }


// function eliminarFavorito(imagen) {
//   //creamos constate donde almacenamosla funcion encargada de buscar el indice y eliminarlo
//   const indice = productos.findIndex(imagen => imagen.nombre === nombre);
//   if (indice !== -1) {
//     productos.splice(indice, 1);
//     localStorage.setItem("productos", JSON.stringify(productos));
//     pintarTabla();
//   }
// }

// function limpiarTabla() {

// }


// //Saver para que las fotos persistan incluso aunque se cierre la página

// //EVENTOS

// //Evento click en documento con imágenes para que aparezcan las fotos de cada categoria > click en una foto --(API Pexels)-->  aparecen las fotos de esa categoria 

// document.addEventListener('click', (event) => {
//   if (event.target.matches('btn')) {
//     getAllImages()
//   }

// });

// document.getElementById('imagenesOrientacion').addEventListener('click', (event) => {
//   const orientation = document.getElementById('orientacion').value;
//   imgOrientacion(orientation);
// })


// imageOrientacion.addEventListener('click', (event) => {
//   if (event.target.matches('.orientacion')) {
//     getallImages()

//     //filtrado según orientación (lanscape= horizontal, portrait = vertical, all = predeterminado)
//   }
// });


// // contenedorBotones.addEventListener('click', (event) => {
// //   const picture = event.target.matches('btn')
// //   const fotosCategoria = getallImagesporCategoria(picture)
// // })

// // const inputSearch = document.getElementById('imageSearch')

// contenedorBotones.addEventListener('submit', (ev) => {

//   //Restar favorito de la sección de favoritos

//   if (ev.target.matches('button')) {
//     restarFavorito(ev.target.classList.value);
//   }



// })



//FUNCIONES

/**Obtener fotos con la URL general */

// const getallImages = async (query, orientation = "all") => {
//   try {

//     let url = `https://api.pexels.com/v1/search?query=${query}&per_page=8`;

//     if (orientation !== "all") {
//       resp += `&orientation=${orientation}`;
//     }

//     const resp = await fetch(url, {
//       headers: { "Authorization": keyAPI }
//     });



//     if (!resp.ok) {

//       throw (`Error:${resp.status}`);

//     }

//     /**json() nos devuelve la respuesta como objeto */
//     const data = await resp.json();
//     console.log(data)
//     return data.photos;
//   }
//   catch (error) {
//     console.log(`Error al obtener las imágenes: ${error}`)
//   }
// };

// getallImages().then((data) => { 

//   return data.photos;

//  });


// arrayCategorias.forEach(categoria => {getallImages(categoria)});

// const fetchImagenes = async function (orientation) {
//     // const apiKey = 'TU_API_KEY'; // Reemplazar con clave real (ej. Unsplash)
//     // let url = `https://unsplash.com{apiKey}`;

//     // Añadir parámetro de orientación si no es 'all'
//     if (orientation !== 'all') {
//         url += `&orientation=${orientation}`;
//     }

// const response = await fetch(url);
// if (!response.ok) throw new Error('Error al obtener imágenes');
// return await response.json();
// }


// const imgOrientacion = async function (orientation) {
//     const container = document.getElementById('contenedorBotones');
//     container.innerHTML = '';

//     try {
//       const resp = await fetch(`https://api.pexels.com/v1/search?query=${endpoint}&orientation=${orientation}&per_page=1`, {
//       headers: { "Authorization": keyAPI }

//     });

//     if(!resp.ok) {

//       throw (`Error:${resp.status}`);

//     }

//     const data = await resp.json();

//       const images = await fetchImages(orientation);

//       container.innerHTML = '';
//       data.forEach(img => {
//           const imgElement = document.createElement('img');
//           imgElement.src = img.urls.small;
//           container.append(imgElement);
//       });
//     } catch (error) {
//         container.innerHTML = 'Error al cargar las imágenes';
//         console.error(error);
//     }
// }


/**Obtener fotos con la URL general */

// / const getallImagesporCategoria = async (categoria) => {
// //   try {



//     const resp2 = await fetch(`https://api.pexels.com/v1/search?query=${categoria}&per_page=6`, {
//       headers: { "Authorization": keyAPI }
//     });

//     if(!resp2.ok) {

//       throw (`Error:${resp2.status}`);

//     }
//     /**json() nos devuelve la respuesta como objeto */
//     const data2 = await resp2.json();
//     return data2.photos;
//   }
//   catch (error) {
//     console.log(`Error: ${error}`)
//   }
// };

// getallImages().then((data2) => { 

//   return data2.photos;

//  });


// arrayCategorias.forEach(categoria => { getallImages(categoria) });




// const botonAñadir = document.createElement('button');

// botonAñadir.textContent = '+';

// boton.appendChild(botonAñadir);//aquí se mete el botón de añadir a favoritos dentro del contenendor. 

//arrayCategorias.forEach(categoria => { getallImages(categoria) });

/**Obtener fotos por id*/

//Función para que aparezcan las fotos de cada categoría al hacer click dividida en dos funciones:

//Función 1: La que se encarga de recoger el fetch 


// const getallImagesporcategoria = async (categoria, index) => {

//   arrayCategorias.forEach(async categoria => {

//     try {
//       const resp2 = await fetch(`https://api.pexels.com/v1/search?query=${categoria}&per_page=1`, { headers: { "Authorization": keyAPI } })

//       if (!resp2.ok) {

//         throw (resp2.status);
//       }
//       const data = await resp2.json();
//       console.log(data.photos)

//       pintarFotos(arrayTodascategorias[index]);

//     }
//     catch (error) {
//       console.log(`Error ${error}`)
//     }

//   })

// }

// getallImagesporcategoria();

//Función 2: La que pinte las fotos en el DOM ----> recibe el array de las fotos y las pinta

const pintarporOrientacion = async (orientacion) => {
  contenedorBotones.innerHTML = "";
  try {
    for (const orientacion of arrayOrientacion) {
      const imagenOrientacion = document.createElement('img')
      const imagenesOrientacion = await getallImages(orientation);
      if (imagenes.length > 0) {
        imagenBoton.src = imagenes[0].src.small;
      }
      const nombreOrientacion = document.createElement('p');
      nombreOrientacion.innerHTML = orientacion;

    }
  } catch (error) {
    throw error;
  }
};
const pintarFotos = (fotos) => {
  const contenedorFotos = document.getElementById('galeriaFotos');
  contenedorBotones.innerHTML = "";

  fotos.forEach(foto => {

    const fotoElement = createElement("img");
    const cajaImagen = createElement("div");

    img.src = foto.src.medium;
    img.alt = foto.alt;
    fotoElement.classList.add("fotoGaleria")
    cajaImagen.classList.add("cajaFoto")

    cajaImagen.append(fotoElement)

    contenedorFotos.append(cajaImagen)


  })
}






//Saver para que las fotos persistan incluso aunque se cierre la página

const agregarFavorito = (foto) => {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  const existe = favoritos.some(fav => fav.id === foto.id);
  if (!existe) {
    favoritos.push(foto);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  } else {
    return
  }
};

const verMisFavoritos = () => {
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  if (favoritos.length === 0) {
    contenedorImagenes.innerHTML = "<h3>Aqui no hay nada</h3>";
    return;
  }
  if (contenedorBotones) {
    contenedorBotones.innerHTML = "<h2>Mis favoritos</h2>";
  }
  mostrarImagenes(favoritos, true);
};


const eliminarFavorito = (foto) => {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  favoritos = favoritos.filter(fav => fav.id !== foto.id);
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  verMisFavoritos();
};