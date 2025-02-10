import axios from 'axios';
import { CONFIG } from '../consts';
export const api = (baseURL?: string) => {
  const instance = axios.create({
    headers: {
      'Content-Type': 'application/json',
    },
    baseURL: baseURL || CONFIG.BASE_URL,
    timeout: 60000,
  });

  instance.interceptors.request.use(
    async function (config: any) {
      if (localStorage.getItem('token')) {
        config.headers!.Authorization = localStorage.getItem('token');
      }
      return { ...config };
    },
    function (error: any) {
      return Promise.reject(error);
    },
  );

  instance.interceptors.request.use(
    function (response: any) {
      return response;
    },
    function (error: any) {
      return Promise.reject(error);
    },
  );

  return instance;
};

export default api;
