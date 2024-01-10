import axios from "axios";

const api = axios.create({
  baseURL: "https://lidermadeiras-api.onrender.com/",
});

export default api;
