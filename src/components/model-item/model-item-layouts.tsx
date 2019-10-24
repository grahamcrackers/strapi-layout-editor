/* eslint-disable array-callback-return */
import { useModelItem } from 'components/model-item/context/model-item.context';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getModelItem, getModelLayouts, getModelMetadata } from 'services/strapi.service';
import { Page } from '../../common/ui/page';
import { GridLayouts } from './grid-layouts';
import { RelationsToggle } from './relations-toggle';
import { SaveLayoutsButton } from 'components/model-item/save-layouts-button';
import { isEmpty } from 'utils/isEmpty';
import { ModelMetadata } from 'interfaces/strapi/model-metadata.interface';

export const ModelItemLayouts = () => {
    const { contentType, itemId } = useParams<{ contentType: string; itemId: string }>();
    const [fetching, setFetching] = useState(true);
    const { setMetadata, setItem, setLayouts, setFilters, setModelLayoutId } = useModelItem();

    useEffect(() => {
        const fetchData = async () => {
            const metadata = await getModelMetadata(contentType);
            const schema: ModelMetadata = metadata.data.data;
            setMetadata(schema);

            const modelItem = await getModelItem(contentType, itemId);
            setItem(modelItem.data);

            // check to see if we already have any layouts
            const modelLayouts = await getModelLayouts(contentType, itemId);

            if (isEmpty(modelLayouts.data)) {
                // default filters to editRelations
                setFilters(schema.layouts.editRelations);
                setLayouts([]);
            } else {
                setModelLayoutId(modelLayouts.data.id);
                setFilters(modelLayouts.data.filters || []);
                setLayouts(modelLayouts.data.layoutJson);
            }

            setFetching(false);
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contentType, itemId]);

    if (fetching) {
        return <div>loading...</div>;
    }

    return (
        <Page className="flex w-full">
            <div className="flex-auto pt-4 pr-4">
                <div className="flex">
                    <div>
                        <h2 className="mb-1 leading-none text-color-900 text-3xl font-normal">Experience Editor</h2>
                        <p className="mt-0 mb-4 text-gray-600">{`${contentType}: ${itemId}`}</p>
                    </div>
                    <div className="ml-auto">
                        <SaveLayoutsButton />
                    </div>
                </div>
                <GridLayouts />
            </div>
            <RelationsToggle className="w-64 pt-4" />
        </Page>
    );
};
