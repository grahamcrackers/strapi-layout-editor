/* eslint-disable array-callback-return */
import React, { useEffect, useContext, useState } from 'react';
import { useAlert } from 'react-alert';
import RGL, { WidthProvider } from 'react-grid-layout';
import { useParams } from 'react-router-dom';
import { Page } from '../../ui/page';
import './index.css';
import { RelationsToggle } from './relations-toggle';
import { ContentData, useContentData, EditLayoutWithPos } from './useContentData';
import { postModelLayouts, getModelMetadata, getModelItem, getModelLayouts } from 'services/strapi.service';
import { ModelItemProvider, ModelItemContext } from 'components/model-item/context';
import { GridLayouts } from './GridLayouts';

export const ExperienceEditor = () => {
    // const alert = useAlert();
    const { contentType, itemId } = useParams<{ contentType: string; itemId: string }>();
    const [fetching, setFetching] = useState(true);
    const modelItemContext = useContext(ModelItemContext);
    const { setMetadata, setItem, setLayouts } = modelItemContext;

    useEffect(() => {
        const fetchData = async () => {
            const metadata = await getModelMetadata(contentType);
            setMetadata(metadata.data.data);

            const modelItem = await getModelItem(contentType, itemId);
            setItem(modelItem.data);

            // check to see if we already have any layouts
            const modelLayouts = await getModelLayouts(contentType, itemId);
            setLayouts(modelLayouts.data);

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
            <GridLayouts />
        </Page>
    );
};
