import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.103:3333' //para conectar a api ao app (passo o ip do expo e a porta utilizada na api em node)
});

export default api;