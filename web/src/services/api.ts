import axios from 'axios';
import Cookies from 'universal-cookie/es6';

export interface ErrorMessage {
  message: string;
}

// TODO usar variáveis de ambiente
const cookies = new Cookies();
const api = axios.create({
  baseURL: 'http://localhost:5164',
  timeout: 5000,
  headers: {
    Authorization: `bearer ${cookies.get('token')}`,
    'Content-Type': 'application/json',
  },
});

export default api;
