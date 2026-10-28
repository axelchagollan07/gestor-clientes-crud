import axios from "axios";

/**
 * Cliente HTTP centralizado.
 * La URL base se lee de las variables de entorno (.env),
 * así evitamos quemar "http://localhost:3000" en todo el código.
 */
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});