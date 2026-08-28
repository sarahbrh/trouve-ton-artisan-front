import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

// Instance Axios dédiée à l'admin : ajoute automatiquement le token JWT
// stocké après connexion sur chaque requête protégée.
const adminApi = axios.create({
  baseURL: API_URL,
});

adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Si le token est expiré/invalide, l'API renvoie 401/403 : on déconnecte proprement
adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem("admin_token");
    }
    return Promise.reject(error);
  },
);

export default adminApi;
