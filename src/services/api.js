import axios from 'axios';

const api = axios.create({
    baseURL : 'https://omnistack-teco.herokuapp.com',
});

export default api;