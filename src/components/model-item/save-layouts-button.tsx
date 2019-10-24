import React, { FC } from 'react';
import { useAlert } from 'react-alert';
import { useParams } from 'react-router-dom';
import { postModelLayouts } from 'services/strapi.service';
import { useModelItem } from './context/model-item.context';

export const SaveLayoutsButton: FC<{}> = () => {
    const alert = useAlert();
    const { contentType, itemId } = useParams<{ contentType: string; itemId: string }>();
    const { layouts, filters, modelLayoutId, setModelLayoutId } = useModelItem();

    const saveModel = async () => {
        try {
            const response = await postModelLayouts(contentType, itemId, layouts, filters, modelLayoutId);
            if (modelLayoutId) {
                alert.success('Layouts Updated!');
            } else {
                setModelLayoutId(response.data.id);
                alert.success('Layouts Saved!');
            }
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
