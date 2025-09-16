import axios from "axios";


export const setAuthInterceptor = (apiInstance) => {
    apiInstance.interceptors.request.use((config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Token ${token}`;
        }
        return config;
    });
}
