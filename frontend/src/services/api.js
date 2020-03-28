import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333', //defindo a URL que é padrão em todas as chamadas
})

export default api;