/* eslint-disable array-callback-return */
import React from 'react';
import RGL, { WidthProvider, Layout } from 'react-grid-layout';
import { useParams } from 'react-router-dom';
import { useTraceUpdate } from '../../common/hooks/useTraceUpdate';
import { StringifyLayout } from './stringify-layout';
import { useContentData, ContentData } from './useContentData';
import { Page } from '../../ui/page';

import './index.css';
// import './example-styles.css';
// import 'react-grid-layout/css/styles.css';

const ReactGridLayout = WidthProvider(RGL);

export const ExperienceEditor = props => {
    useTraceUpdate(props);
    const { contentType, itemId } = useParams();
    const { data, layout, setLayout } = useContentData(contentType, itemId);

    return (
        <Page className="p-4 w-full">
            <h2 className="mb-1 leading-none text-color-900 text-3xl font-normal">Experience Editor</h2>
            <p className="mt-0 mb-4 text-gray-600">{`${contentType}: ${itemId}`}</p>
            {/* List Elements and their values */}
            {/* <ul className="list pl0">
                {data.map(d => {
                    return (
                        <li key={d.key} className="pa3 pa4-ns bb b--black-10">
                            <b className="db f3 mb1">{d.key}</b>
                            <span className="f5 db lh-copy measure">{JSON.stringify(d.value)}</span>
                        </li>
                    );
                })}
            </ul> */}
            {/* <StringifyLayout layout={layout} /> */}
            <div className="bg-gray-300">
                Displayed as <code>[x, y, w, h]</code>:
                <div className="columns">
                    {layout.map((l: Layout) => (
                        <div className="layoutItem" key={l.i}>
                            <b>{l.i}</b>: [{l.x}, {l.y}, {l.w}, {l.h}]
                        </div>
                    ))}
                </div>
            </div>
            <ReactGridLayout
                layout={layout}
                onLayoutChange={layouts => {
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
            </ReactGridLayout>

            {/* <JsonStringify {...data} /> */}
        </Page>
    );
};
