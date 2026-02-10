import api from "./api";

/* Obtener directores */
export async function fetchDirectores() {
  const res = await api.get("/api/directores/");
  return res.data;
}

/* Convertir archivo a Base64 */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* Crear director */
export async function addDirector(directorData) {
  const payload = { ...directorData };

  if (directorData.foto instanceof File) {
    payload.foto = await fileToBase64(directorData.foto);
  }

  const res = await api.post("/api/directores/", payload);
  return res.data;
}

/* Obtener por ID */
export async function fetchDirectorById(id) {
  const res = await api.get(`/api/directores/${id}/`);
  return res.data;
}

/* Actualizar */
export async function updateDirector(id, directorData) {
  const payload = { ...directorData };

  if (directorData.foto instanceof File) {
    payload.foto = await fileToBase64(directorData.foto);
  } else {
    delete payload.foto;
  }

  const res = await api.patch(`/api/directores/${id}/`, payload);
  return res.data;
}

/* Eliminar */
export async function deleteDirector(id) {
  await api.delete(`/api/directores/${id}/`);
}
