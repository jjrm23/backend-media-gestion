import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://backend-media-gestion.onrender.com' 
});