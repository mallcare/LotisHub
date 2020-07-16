import axios from 'axios';
import config from 'config';

const apiServer = axios.create({
    baseURL: config.apiUrl
})

export default apiServer;