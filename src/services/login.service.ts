import axios, { AxiosRequestConfig } from 'axios';
import { getToken, saveToken } from './token.service';

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
    return await axios
        .post(`${process.env.REACT_APP_STRAPI_ENDPOINT}/admin/auth/local`, {
            identifier,
            password,
        })
        .then(response => {
            // Handle success.
            // console.log('Well done!');
            // console.log('User profile', response.data.user);
            // console.log('User token', response.data.jwt);
            saveToken(response.data.jwt);
        })
        .catch(error => {
            // Handle error.
            console.log('An error occurred:', error);
        });
};
