import axios from "axios";

const AUTH_BASE_URL = import.meta.env.VITE_API_BASE;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

/**
 * Login (OAuth2 Password Grant)
 */
export async function login(username, password) {
  const params = new URLSearchParams();
  params.append("grant_type", "password");
  params.append("username", username);
  params.append("password", password);
  params.append("client_id", CLIENT_ID);


  const response = await axios.post(
    `${AUTH_BASE_URL}/o/token/`,
    params,
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );

  if (response.data?.access_token) {
    localStorage.setItem("access_token", response.data.access_token);
  }
  if (response.data?.refresh_token) {
    localStorage.setItem("refresh_token", response.data.refresh_token);
  }

  return response.data;
}

/**
 * Headers para endpoints protegidos
 */
export function getAuthHeaders() {
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * Logout: revoca tokens y limpia storage
 */
export async function logout() {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const revoke = async (token) => {
    if (!token) return;

    const params = new URLSearchParams();
    params.append("token", token);
    params.append("client_id", CLIENT_ID);
    params.append("client_secret", CLIENT_SECRET);

    await axios.post(
      `${AUTH_BASE_URL}/o/revoke_token/`,
      params,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
  };

  try {
    await revoke(accessToken);
    await revoke(refreshToken);
  } finally {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
}
