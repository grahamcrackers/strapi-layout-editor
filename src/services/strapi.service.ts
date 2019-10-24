import axios from 'axios';
import { StrapiGetParams } from 'interfaces/strapi/strapi.interface';
import qs from 'qs';
import { Layout } from 'react-grid-layout';

// set your strapi endpoint in your root .env file
const endpoint = process.env.REACT_APP_STRAPI_ENDPOINT;

// prepend the parameters with '_'
const getParams = (params: StrapiGetParams) => {
    let prepend = {};

    for (const param in params) {
        prepend = { ...prepend, [`_${param}`]: params[param] };
    }

    return qs.stringify(prepend, { addQueryPrefix: true });
};

export const getModels = async () => {
    const url = `${endpoint}/content-manager/content-types`;
    return await axios.get(url);
};

export const getModelMetadata = async (model: string) => {
    const url = `${endpoint}/content-manager/content-types/${model}`;
    return await axios.get(url);
};

export const getModelCount = async (model: string) => {
    const url = `${endpoint}/content-manager/explorer/${model}/count`;
    return await axios.get(url);
};

/** default params { start: 0, limit: 10 } */
export const getModelItems = async (model: string, params: StrapiGetParams = {}) => {
    const initialParams = { start: 0, limit: 10, sort: 'id:ASC' };
    const url = `${endpoint}/content-manager/explorer/${model}`;
    const encoded = getParams({ ...initialParams, ...params });

    return await axios.get(`${url}${encoded}`);
};

export const getModelItem = async (model, id) => {
    const url = `${endpoint}/content-manager/explorer/${model}/${id}`;
    return await axios.get(url);
};

export const getModelLayouts = async (model: string, id: string) => {
    const url = `${endpoint}/layout-editor/${model}/${id}/layouts?source=layout-editor`;
    return await axios.get(url);
};

export const postModelLayouts = async (
    modelType: string,
    modelId: string,
    layoutJson: Layout[],
    filters: string[] = [],
    layoutId = '',
) => {
    if (layoutId) {
        const url = `${endpoint}/content-manager/explorer/modellayout/${layoutId}?source=layout-editor`;
        return await axios.put(url, { modelType, modelId, filters, layoutJson });
    }

    const url = `${endpoint}/content-manager/explorer/modellayout?source=layout-editor`;
    return await axios.post(url, { modelType, modelId, filters, layoutJson });
};
