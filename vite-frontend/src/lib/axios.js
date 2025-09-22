import axios from "axios";

const token = localStorage.getItem("jwt");

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
    Accept: "application/json"
  }
});
export function setAuthToken(token) {
  instance.defaults.headers["Authorization"] = `Bearer ${token}`;
}

export default instance;
