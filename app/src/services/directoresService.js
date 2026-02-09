import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* Obtener directores */
export async function fetchDirectores() {
  const response = await axios.get(`${API_BASE_URL}/directores/`);
  return response.data;
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

  const response = await axios.post(`${API_BASE_URL}/directores/`, payload);
  return response.data;
}

/* Obtener director por ID */
export async function fetchDirectorById(id) {
  const response = await axios.get(`${API_BASE_URL}/directores/${id}/`);
  return response.data;
}

/* Actualizar director */
export async function updateDirector(id, directorData) {
  const payload = { ...directorData };

  if (directorData.foto instanceof File) {
    payload.foto = await fileToBase64(directorData.foto);
  } else {
    delete payload.foto; // no cambiar foto
  }

  const response = await axios.patch(`${API_BASE_URL}/directores/${id}/`, payload);
  return response.data;
}

/* Eliminar director */
export async function deleteDirector(id) {
  await axios.delete(`${API_BASE_URL}/directores/${id}/`);
}
