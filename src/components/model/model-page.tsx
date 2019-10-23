import { ModelSearch } from 'components/model/model-search';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getModelCount, getModelItems, getModelMetadata } from 'services/strapi.service';
import { useModel } from './context/model.context';
import { ModelTable } from './model-table';
import { ModelTablePagination } from './model-table-pagination';

export const ModelPage: FC<{}> = () => {
    const { contentType } = useParams<{ contentType: string }>();
    const [fetching, setFetching] = useState(true);
    const { setMetadata, count, setCount, setItems } = useModel();

    // get our models metadata, total count, and first 10 instances (if any);
    useEffect(() => {
        const initialize = async () => {
            // get our model's metadata
            const modelMetadata = await getModelMetadata(contentType);
            setMetadata(modelMetadata.data.data);

            // get our model count
            const modelCount = await getModelCount(contentType);
            setCount(modelCount.data.count);

            const modelItems = await getModelItems(contentType);
            setItems(modelItems.data);

            setFetching(false);
        };
        initialize();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contentType]);

    if (fetching) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4 pl-0">
            <h1 className="mb-1 leading-none text-color-900 text-4xl font-light capitalize">{contentType}</h1>
            <p className="mt-0 mb-4 text-gray-600">{count} entries found</p>
            <ModelSearch />
            {count > 0 && (
                <>
                    <hr className="my-8 border-b-2 border-gray-200" />

                    <ModelTable />
                    <ModelTablePagination />
                </>
            )}
        </div>
    );
};
