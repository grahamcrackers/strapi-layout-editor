import React, { useContext, useEffect, useState } from 'react';
import { ModelContext } from 'contexts/ModelContext';
import { useParams } from 'react-router-dom';
import { get, getModelItem } from 'services/strapi.service';
import { ModelItemContext } from './context';

export const ModelLayout = () => {
    const { contentType, itemId } = useParams();
    const { metadata } = useContext(ModelContext);
    const { setModelItem } = useContext(ModelItemContext);

    useEffect(() => {
        const fetchData = async () => {
            // const { data } = await get(`content-manager/content-types/${contentType}`);
            // setContentModel(data);

            const result = await getModelItem(contentType, itemId);
            setModelItem(result);

            // // check to see if we already have any layouts
            // const existingLayouts: ModelLayout = await get(
            //     `layout-editor/${contentType}/${itemId}/layouts?source=layout-editor`,
            // );

            // setExistingLayouts(existingLayouts);
        };
        fetchData();
        // only get data on component mount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return null;
};
