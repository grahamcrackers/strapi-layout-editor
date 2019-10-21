import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getModelCount, getModelItems, getModelMetadata } from 'services/strapi.service';
import { ModelTable } from '../components/model-table/model-table';
import { ModelTablePagination } from '../components/model-table/model-table-pagination';
import { ModelContext } from '../contexts/ModelContext';

interface Pagination<T = []> {
    index: number;
    size: number;
    count: number;
    total: number;
    data: T;
}

const initialPaginate: Pagination = {
    index: 0,
    size: 10,
    count: 0,
    total: 0,
    data: [],
};

export const usePagination = () => {
    const [pagination, setPagination] = useState<Pagination>(initialPaginate);
    // const total = totalPages(modelCount.data.count, pagination.size);

    return { pagination, setPagination };
};

export const useModel = (contentType: string) => {
    const modelContext = useContext(ModelContext);
    const { metadata, setMetadata, count, setCount, items, setItems } = modelContext;

    // get our models metadata, total count, and first 10 instances (if any);
    useEffect(() => {
        const initialize = async () => {
            // get our model's metadata
            const modelMetadata = await getModelMetadata(contentType);
            setMetadata(modelMetadata.data.data);

            // get our model count
            const modelCount = await getModelCount(contentType);
            setCount(modelCount.data.count);

            const modelItems = await getModelItems(contentType, {
                limit: 10,
                start: 0,
            });
            setItems(modelItems.data);
        };
        initialize();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contentType]);

    return {
        ...modelContext,
    };
};

export const ModelPage = () => {
    const { contentType } = useParams<{ contentType: string }>();
    const { metadata, count } = useModel(contentType);

    if (!metadata.uid && !count) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 className="mb-1 leading-none text-color-900 text-4xl font-light capitalize">{contentType}</h1>
            <p className="mt-0 mb-4 text-gray-600">{count} entries found</p>
            <hr className="my-8 border-b-2 border-gray-200" />
            <ModelTable />
            {/* <ModelTablePagination totalPages={totalPages(pagination)} /> */}
        </div>
    );
};
