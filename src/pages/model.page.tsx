import React, { useEffect, useContext } from 'react';
import { getModelMetadata, getModelCount } from 'services/strapi.service';
import { useParams } from 'react-router';
import { ModelContext } from '../contexts/ModelContext';
import { JsonStringify } from 'common/json-stringify';

export const ModelPage = () => {
    const { contentType } = useParams<{ contentType: string }>();
    const { metadata, setMetadata, count, setCount } = useContext(ModelContext);

    useEffect(() => {
        const initialize = async () => {
            // get our model's metadata
            const modelMetadata = await getModelMetadata(contentType);
            setMetadata(modelMetadata.data);

            // get our model count
            const modelCount = await getModelCount(contentType);
            setCount(modelCount.data.count);
        };
        initialize();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!metadata && !count) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>
                <JsonStringify {...metadata} />
            </div>
            <div>{JSON.stringify(count)}</div>
        </div>
    );
};
