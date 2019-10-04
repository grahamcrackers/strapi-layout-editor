import axios, { AxiosRequestConfig } from 'axios';
import { getToken } from './token.service';

// If we have a token, attach it to every request
axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    },
);

export const login = async (identifier: string, password: string) => {
    return await axios.post(`${process.env.REACT_APP_STRAPI_ENDPOINT}/admin/auth/local`, {
        identifier,
        password,
    });
};
