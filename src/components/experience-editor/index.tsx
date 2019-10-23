/* eslint-disable array-callback-return */
import { useModelItem } from 'components/model-item/context/model-item.context';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getModelItem, getModelLayouts, getModelMetadata } from 'services/strapi.service';
import { Page } from '../../common/ui/page';
import { GridLayouts } from './grid-layouts';
import { RelationsToggle } from './relations-toggle';

function isEmpty(obj) {
    for (const x in obj) {
        return false;
    }
    return true;
}

export const ExperienceEditor = () => {
    const { contentType, itemId } = useParams<{ contentType: string; itemId: string }>();
    const [fetching, setFetching] = useState(true);
    const { setMetadata, setItem, setLayouts } = useModelItem();

    useEffect(() => {
        const fetchData = async () => {
            const metadata = await getModelMetadata(contentType);
            setMetadata(metadata.data.data);

            const modelItem = await getModelItem(contentType, itemId);
            setItem(modelItem.data);

            // check to see if we already have any layouts
            const modelLayouts = await getModelLayouts(contentType, itemId);

            // todo change pugin to return empty array, not object
            if (!modelLayouts.data.length || isEmpty(modelLayouts.data)) {
                setLayouts([]);
            } else {
                setLayouts(modelLayouts.data);
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
                <div>
                    <h2 className="mb-1 leading-none text-color-900 text-3xl font-normal">Experience Editor</h2>
                    <p className="mt-0 mb-4 text-gray-600">{`${contentType}: ${itemId}`}</p>
                </div>
                <div className="ml-auto">
                    <button className="btn btn-blue m-1" onClick={() => console.log('saved!')}>
                        Save
                    </button>
                </div>
                <GridLayouts />
            </div>

            <RelationsToggle className="w-64" />
        </Page>
    );
};
