import axios from 'axios';
// TODO usar variáveis de ambiente
const api = axios.create({
  baseURL: 'http://localhost:5164',
});

export default api;
