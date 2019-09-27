/* eslint-disable array-callback-return */
import React from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import { useParams } from 'react-router-dom';
import { useTraceUpdate } from '../../common/hooks/useTraceUpdate';
import { StringifyLayout } from './stringify-layout';
import { useContentData } from './useContentData';

import './example-styles.css';
import './index.css';

const ReactGridLayout = WidthProvider(RGL);

export const ExperienceEditor = props => {
    useTraceUpdate(props);
    const { contentType, itemId } = useParams();
    const { data, layout, setLayout } = useContentData(contentType, itemId);

    return (
        <section>
            <h1 className="mv0">{`${contentType}: ${itemId}`}</h1>
            <p className="lh-copy measure black-50 mt0">Experience Editor</p>

            <StringifyLayout layout={layout} />
            <ReactGridLayout
                layout={layout}
                onLayoutChange={layouts => {
                    setLayout(layouts);
                }}
                cols={12}
                rowHeight={30}
            >
                {data.map(d => {
                    return (
                        <div key={d.key}>
                            <span>{d.key}</span>
                        </div>
                    );
                })}
            </ReactGridLayout>
            {/* <JsonStringify {...data} /> */}
        </section>
    );
};
