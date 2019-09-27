/* eslint-disable array-callback-return */
import React from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import { useParams } from 'react-router-dom';
import { useTraceUpdate } from '../../common/hooks/useTraceUpdate';
import { StringifyLayout } from './stringify-layout';
import { useContentData, ContentData } from './useContentData';

import './example-styles.css';
import './index.css';

import { JsonStringify } from '../../common/json-stringify';

const ReactGridLayout = WidthProvider(RGL);

export const ExperienceEditor = props => {
    useTraceUpdate(props);
    const { contentType, itemId } = useParams();
    const { metadata, original, data, layout, setLayout } = useContentData(contentType, itemId);

    return (
        <section>
            <h1 className="mv0">{`${contentType}: ${itemId}`}</h1>
            <p className="lh-copy measure black-50 mt0">Experience Editor</p>
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
            <StringifyLayout layout={layout} />
            <ReactGridLayout
                layout={layout}
                onLayoutChange={layouts => {
                    setLayout(layouts);
                }}
            >
                {data.map((d: ContentData) => {
                    return (
                        <div key={d.key}>
                            <span>{d.key}</span>
                            <div>
                                <pre>
                                    <code>{JSON.stringify(d.value)}</code>
                                </pre>
                            </div>
                        </div>
                    );
                })}
            </ReactGridLayout>

            {/* <JsonStringify {...data} /> */}
        </section>
    );
};
