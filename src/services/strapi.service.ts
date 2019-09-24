import axios from 'axios';
import { config } from '../config/config';

export const get = async (uri: string) => {
    const result = await axios.get(`${config.strapi.endpoint}/${uri}`);

    return result.data;
};
