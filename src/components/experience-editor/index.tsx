/* eslint-disable array-callback-return */
import axios from 'axios';
import React from 'react';
import { useAlert } from 'react-alert';
import RGL, { Layout, WidthProvider } from 'react-grid-layout';
import { useParams } from 'react-router-dom';
import { config } from '../../config/config';
import { Page } from '../../ui/page';
import './index.css';
import { ContentData, useContentData } from './useContentData';

const postModelLayouts = async (modelType, modelId, layoutJson: Layout[]) => {
    const url = `${config.strapi.endpoint}/content-manager/explorer/modellayout?source=layout-editor`;
    return await axios.post(url, { modelType, modelId, layoutJson });
};

const ReactGridLayout = WidthProvider(RGL);

export const ExperienceEditor = props => {
    const { contentType, itemId } = useParams();
    const { data, layout, setLayout } = useContentData(contentType, itemId);
    const alert = useAlert();

    const saveModel = async () => {
        try {
            await postModelLayouts(contentType, itemId, layout);
            alert.success('Layouts Saved!');
        } catch (err) {
            alert.error('Something went wrong');
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
                    })}
            </ReactGridLayout>
        </Page>
    );
};
