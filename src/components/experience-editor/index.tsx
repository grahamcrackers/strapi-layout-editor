/* eslint-disable array-callback-return */
import React from 'react';
import RGL, { WidthProvider, Layout } from 'react-grid-layout';
import { useParams } from 'react-router-dom';
import { useTraceUpdate } from '../../common/hooks/useTraceUpdate';
import { useContentData, ContentData } from './useContentData';
import { Page } from '../../ui/page';
import axios from 'axios';

import './index.css';
import { config } from '../../config/config';
import { JsonStringify } from 'common/json-stringify';
import { useAlert } from 'react-alert';

const postModelLayouts = async (modelType, modelId, layoutJson: Layout[]) => {
    const url = `${config.strapi.endpoint}/content-manager/explorer/modellayout?source=layout-editor`;
    return await axios.post(url, { modelType, modelId, layoutJson });
};

const ReactGridLayout = WidthProvider(RGL);

export const ExperienceEditor = props => {
    // useTraceUpdate(props);
    const { contentType, itemId } = useParams();
    const { metadata, data, layout, setLayout } = useContentData(contentType, itemId);
    const alert = useAlert();

    const saveModel = async () => {
        try {
            await postModelLayouts(contentType, itemId, layout);
            alert.success('Layouts Saved!');
        } catch (err) {
            console.log(JSON.stringify(err));
            alert.error('Something went wrong');
            // throw new Error(err);
        }
    };

    return (
        <Page className="p-4 w-full">
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
            </div>
            <div className="bg-gray-400">
                Displayed as <code>[x, y, w, h]</code>:
                <div className="flex flex-wrap bg-gray-300">
                    {layout.map((l: Layout) => (
                        <div className="w-1/3 text-gray-700 bg-gray-400 px-4 py-2 m-2" key={l.i}>
                            <b>{l.i}</b>: [{l.x}, {l.y}, {l.w}, {l.h}]
                        </div>
                    ))}
                </div>
            </div>
            <ReactGridLayout
                layout={layout}
                onLayoutChange={layouts => {
                    console.log(JSON.stringify(layouts));
                    setLayout(layouts);
                }}
                className="bg-gray-200"
            >
                {data
                    .filter((d: ContentData) => d.attributes.type !== 'relation')
                    .map((d: ContentData) => {
                        return (
                            <div key={d.key} className="rounded shadow bg-white">
                                <span>{d.key}</span>
                                <pre>
                                    <code>{JSON.stringify(d.value)}</code>
                                </pre>
                            </div>
                        );
                    })}
                {data
                    .filter((d: ContentData) => d.attributes.type === 'relation')
                    .map((d: ContentData) => {
                        return (
                            <div key={d.key} className="rounded shadow bg-white">
                                <span>{d.key}</span>
                                {/* <pre>
                                    <code>{JSON.stringify(d.value)}</code>
                                </pre> */}
                            </div>
                        );
                    })}
            </ReactGridLayout>

            <aside className="w-64"></aside>
            {/* <JsonStringify {...metadata} /> */}
        </Page>
    );
};
