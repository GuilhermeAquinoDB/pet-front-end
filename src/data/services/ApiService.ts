import axios from 'axios';

export const ApiService = axios.create({
    baseURL: 'https://adoteumpet.onrender.com/api',
    headers: {
      'Content-Type': 'application/json'
    }
})