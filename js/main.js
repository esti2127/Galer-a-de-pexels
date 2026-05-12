//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//VARIABLES
const keyAPI = "fGhFoAuT6joFd5Xg1VpciXCPoGTi8Jgbanp1do5pSfXSlu1rzwBjPAi6";
const imageOrientacion = document.querySelector('#orientacion');
const contenedorBotones = document.querySelector('#contenedorBotones')
const contenedorImagenes = document.getElementById("mostrarImagenes")
const arrayCategorias = ["nature", "animals", "plants"];
const arrayOrientacion = ["landscape", "portrait"];

//EVENTOS

document.addEventListener('click', async (event) => {
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
//FUNCIONES

const getAllImages = async (categoria, orientation = "landscape") => {
  try {
    const resp = await fetch(`https://api.pexels.com/v1/search?query=${categoria}&per_page=8`, {
      headers: {
        "Authorization": keyAPI
      }
    });
    if (!resp.ok) throw new Error(`Error API: ${response.status}`);

    const data = await resp.json();
    return data.photos;
  }
  catch (error) {
    console.log(`Error:${error}`)
    return [];
  }
};

const pintarBoton = async () => {
  contenedorBotones.innerHTML = "";
  for (const cat of arrayCategorias) {
    const btn = document.createElement('button');
    btn.classList.add('boton');
    btn.dataset.categoria = cat;
    const imagenBoton = document.createElement('img');
    const nombreCategoria = document.createElement('p');
    nombreCategoria.textContent = cat;
    const fotos = await getAllImages(cat);
    if (fotos && fotos.length > 0) {
      imagenBoton.src = fotos[0].src.small;
      imagenBoton.alt = cat;
    }
    btn.append(imagenBoton);
    btn.append(nombreCategoria);
    contenedorBotones.append(btn);
  }
};


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