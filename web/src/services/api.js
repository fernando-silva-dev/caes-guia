import axios from "axios";
// TODO usar variáveis de ambiente
const api = axios.create({
  baseURL: "http://localhost:5164",
  timeout: 5000,
  headers: {
    'Authorization': "JWT_TOKEN",
    'Content-Type': 'application/json'
  }
});

export default api;