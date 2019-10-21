import axios from 'axios';
import { config } from '../config/config';

export const get = async (uri: string) => {
    const result = await axios.get(`${config.strapi.endpoint}/${uri}`);

    return result.data;
};

export const getModelMetadata = async (model: string) => {
    const url = `${config.strapi.endpoint}/content-manager/content-types/${model}`;
    return await axios.get(url);
};

export const getModelCount = async (model: string) => {
    const url = `${config.strapi.endpoint}/content-manager/explorer/${model}/count`;
    return await axios.get(url);
};
