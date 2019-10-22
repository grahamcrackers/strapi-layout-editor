/* eslint-disable array-callback-return */
import React, { useEffect, useContext } from 'react';
import { useAlert } from 'react-alert';
import RGL, { WidthProvider } from 'react-grid-layout';
import { useParams } from 'react-router-dom';
import { Page } from '../../ui/page';
import './index.css';
import { RelationsToggle } from './relations-toggle';
import { ContentData, useContentData, EditLayoutWithPos } from './useContentData';
import { postModelLayouts, getModelMetadata, getModelItem, getModelLayouts } from 'services/strapi.service';
import { ModelItemProvider, ModelItemContext } from 'components/model-item/context';

const ReactGridLayout = WidthProvider(RGL);

const useModelItem = (model: string, id: string) => {
    const modelItemContext = useContext(ModelItemContext);
    const { metadata, setMetadata, setItem, setLayouts } = modelItemContext;

    useEffect(() => {
        const fetchData = async () => {
            const metadata = await getModelMetadata(model);
            setMetadata(metadata.data);

            const modelItem = await getModelItem(model, id);
            setItem(modelItem.data);

            // check to see if we already have any layouts
            const modelLayouts = await getModelLayouts(model, id);
            setLayouts(modelLayouts.data);
        };
        fetchData();
        // only get data on component mount
    }, [id, model, setItem, setLayouts, setMetadata]);

    /**
     * Flatten the edit layout matrix but preserve the x, y positions in the array matrix
     */
    const flattenEditLayouts = (): EditLayoutWithPos[] => {
        const flattened: EditLayoutWithPos[] = [];
        if (metadata.layouts) {
            const editLayouts = metadata.layouts.edit;

            for (const yPos in editLayouts) {
                const editKey = editLayouts[yPos];
                for (const xPos in editKey) {
                    flattened.push({ ...editKey[xPos], y: +yPos, x: +xPos });
                }
            }
        }

        return flattened;
    };

    return {
        editLayouts: flattenEditLayouts(),
        ...modelItemContext,
    };
};

export const ExperienceEditor = () => {
    const { contentType, itemId } = useParams<{ contentType: string; itemId: string }>();
    const alert = useAlert();
    // const { setMetadata, setItem, setLayouts } =  useContext(ModelItemContext)
    const { layouts, setLayouts } = useModelItem(contentType, itemId);

    // const saveModel = async () => {
    //     try {
    //         await postModelLayouts(contentType, itemId, layout, existingLayoutId);
    //         if (existingLayoutId) {
    //             alert.success('Layouts Updated!');
    //         } else {
    //             alert.success('Layouts Saved!');
    //         }
    //     } catch (err) {
    //         alert.error('Something went wrong');
    //     }
    // };

    return (
        <Page className="flex w-full">
            {/* <div className="flex-column pt-4 w-full">
                    <div className="flex">
                        <div className="flex flex-col">
                            <h2 className="mb-1 leading-none text-color-900 text-3xl font-normal">Experience Editor</h2>
                            <p className="mt-0 mb-4 text-gray-600">{`${contentType}: ${itemId}`}</p>
                        </div>
                        <div className="ml-auto">
                            <button className="btn btn-blue m-1" onClick={() => saveModel()}>
                                Save
                            </button>
                        </div>
                    </div> */}
            <ReactGridLayout
                layout={layouts}
                onLayoutChange={layouts => {
                    setLayouts(layouts);
                }}
                className="bg-gray-200"
            >
                {/* {data
                            .filter((d: ContentData) => d.attributes.type !== 'relation')
                            .map((d: ContentData) => {
                                return (
                                    <div key={d.key} className="rounded shadow bg-white">
                                        <span>{d.key}</span>
                                        <div>{d.value}</div>
                                    </div>
                                );
                            })}
                        {data
                            .filter((d: ContentData) => d.attributes.type === 'relation' && d.value && d.value.length)
                            .map((d: ContentData) => {
                                return d.value.map(r => {
                                    console.log(r._id);
                                    return (
                                        <div key={r.id} className="rounded shadow bg-white">
                                            <p>
                                                {d.key}:{r.id}
                                            </p>
                                            <div key={r._id}>{`${r.name ? r.name : ''} ${r.title ? r.title : ''} ${
                                                r.url ? r.url : ''
                                            } `}</div>
                                        </div>
                                    );
                                });
                            })} */}
            </ReactGridLayout>
        </Page>
    );
};
