import api from "./api";

/* Obtener películas */
export async function fetchPeliculas() {
  const res = await api.get("/api/peliculas/");
  return res.data;
}

/* Base64 */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result); // data:image/...;base64,...
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* Crear */
export async function addPelicula(peliculaData) {
  let posterValue = "";

  // ✅ soporta File o string Base64
  if (peliculaData.poster instanceof File) {
    posterValue = await fileToBase64(peliculaData.poster);
  } else if (typeof peliculaData.poster === "string") {
    posterValue = peliculaData.poster;
  }

  const payload = {
    // ✅ CAMBIO CLAVE: director_id (NO director)
    director_id: peliculaData.director_id ? Number(peliculaData.director_id) : null,

    titulo: peliculaData.titulo,
    genero: peliculaData.genero,
    fecha_estreno: peliculaData.fecha_estreno || null,
    duracion_min:
      peliculaData.duracion_min === "" ||
      peliculaData.duracion_min === null ||
      peliculaData.duracion_min === undefined
        ? null
        : Number(peliculaData.duracion_min),
    poster: posterValue || "",
  };

  const res = await api.post("/api/peliculas/", payload);
  return res.data;
}

/* Obtener por ID */
export async function fetchPeliculaById(id) {
  const res = await api.get(`/api/peliculas/${id}/`);
  return res.data;
}

/* Actualizar */
export async function updatePelicula(id, peliculaData) {
  const payload = {
    // ✅ CAMBIO CLAVE: director_id (NO director)
    director_id: peliculaData.director_id ? Number(peliculaData.director_id) : undefined,

    titulo: peliculaData.titulo,
    genero: peliculaData.genero,
    fecha_estreno: peliculaData.fecha_estreno || null,
    duracion_min:
      peliculaData.duracion_min === "" ||
      peliculaData.duracion_min === null ||
      peliculaData.duracion_min === undefined
        ? null
        : Number(peliculaData.duracion_min),
  };

  // ✅ si mandas poster, lo actualiza (File o Base64 string)
  if (peliculaData.poster instanceof File) {
    payload.poster = await fileToBase64(peliculaData.poster);
  } else if (typeof peliculaData.poster === "string" && peliculaData.poster !== "") {
    payload.poster = peliculaData.poster;
  }

  const res = await api.patch(`/api/peliculas/${id}/`, payload);
  return res.data;
}

/* Eliminar */
export async function deletePelicula(id) {
  await api.delete(`/api/peliculas/${id}/`);
}
