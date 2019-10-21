import axios from 'axios';
import { StrapiGetParams } from 'interfaces/strapi/strapi.interface';
import qs from 'qs';
import { config } from '../config/config';

export const get = async (uri: string) => {
    const result = await axios.get(`${config.strapi.endpoint}/${uri}`);

    return result.data;
};

// prepend the parameters with '_'
const getParams = (params: StrapiGetParams) => {
    let prepend = {};

    for (const param in params) {
        prepend = { ...prepend, [`_${param}`]: params[param] };
    }

    return qs.stringify(prepend, { addQueryPrefix: true });
};

export const getModelMetadata = async (model: string) => {
    const url = `${config.strapi.endpoint}/content-manager/content-types/${model}`;
    return await axios.get(url);
};

export const getModelCount = async (model: string) => {
    const url = `${config.strapi.endpoint}/content-manager/explorer/${model}/count`;
    return await axios.get(url);
};

export const getModelItems = async (model: string, params: StrapiGetParams = {}) => {
    const url = `${config.strapi.endpoint}/content-manager/explorer/${model}`;
    const encoded = getParams(params);

    return axios.get(`${url}${encoded}`);
};
