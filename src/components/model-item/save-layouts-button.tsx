import React from 'react';
import { useAlert } from 'react-alert';
import { useParams } from 'react-router-dom';
import { postModelLayouts } from 'services/strapi.service';
import { useModelItem } from './context/model-item.context';

export const SaveLayoutsButton = () => {
    const alert = useAlert();
    const { contentType, itemId } = useParams<{ contentType: string; itemId: string }>();
    const { layouts, filters } = useModelItem();

    const saveModel = async () => {
        try {
            await postModelLayouts(contentType, itemId, layouts);
            // if (existingLayoutId) {
            //     alert.success('Layouts Updated!');
            // } else {
            alert.success('Layouts Saved!');
            // }
        } catch (err) {
            alert.error('Something went wrong');
        }
    };

    return (
        <button className="btn btn-blue m-1" onClick={() => saveModel()}>
            Save
        </button>
    );
};
