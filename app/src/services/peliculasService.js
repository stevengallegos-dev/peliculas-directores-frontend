import axios from "axios";

// ✅ usa tu variable real del .env (CRUD)
const API_BASE_URL = import.meta.env.VITE_API_URL;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Obtener la lista de películas
 */
export async function fetchPeliculas() {
  const response = await axios.get(`${API_BASE_URL}/peliculas/`);
  return response.data;
}

/**
 * Convertir un archivo a Base64
 */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result); // incluye encabezado data:image
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Crear una nueva película
 */
export async function addPelicula(peliculaData) {
  let posterBase64 = "";
  if (peliculaData.poster) {
    posterBase64 = await fileToBase64(peliculaData.poster);
  }

  const directorId = Array.isArray(peliculaData.director)
    ? peliculaData.director[0]
    : peliculaData.director;

  const payload = {
    ...peliculaData,
    director: directorId ? Number(directorId) : null,
    poster: posterBase64,
  };

  const response = await axios.post(`${API_BASE_URL}/peliculas/`, payload);
  return response.data;
}


/**
 * Obtener película por ID (detalle / editar)
 */
export async function fetchPeliculaById(id) {
  const response = await axios.get(`${API_BASE_URL}/peliculas/${id}/`);
  return response.data;
}

/**
 * Actualizar película
 */
export async function updatePelicula(id, peliculaData) {
  const payload = { ...peliculaData };

  if (peliculaData.poster instanceof File) {
    payload.poster = await fileToBase64(peliculaData.poster);
  } else {
    delete payload.poster;
  }

  const response = await axios.patch(`${API_BASE_URL}/peliculas/${id}/`, payload);
  return response.data;
}

/**
 * Eliminar película
 */
export async function deletePelicula(id) {
  await axios.delete(`${API_BASE_URL}/peliculas/${id}/`);
}
