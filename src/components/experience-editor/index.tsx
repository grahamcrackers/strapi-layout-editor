/* eslint-disable array-callback-return */
import React from 'react';
import { useParams } from 'react-router-dom';
import { JsonStringify } from '../../common/json-stringify';
import { useContentData } from './useContentData';
import ReactGridLayout from 'react-grid-layout';
import { StringifyLayout } from './stringify-layout';

import './index.css';
import './example-styles.css';

export const ExperienceEditor = props => {
    const { contentType, itemId } = useParams();
    const notAllowed: string[] = ['id', 'createdAt', 'updatedAt'];
    const { metadata, original, data } = useContentData(contentType, itemId, notAllowed);

    return (
        <section className="mw5 mw7-ns">
            <h1 className="mv0">{`${contentType}: ${itemId}`}</h1>
            <p className="lh-copy measure black-50 mt0">Experience Editor</p>

            <ul className="list pl0">
                {/* List Elements and their values */}
                {data.map((d, index) => {
                    return (
                        <li className="pa3 pa4-ns bb b--black-10">
                            <b className="db f3 mb1">{d.key}</b>
                            <span className="f5 db lh-copy measure">{d.value}</span>
                        </li>
                    );
                })}
            </ul>
            <StringifyLayout layout={[]} />
            <ReactGridLayout layout={[]} cols={12} rowHeight={30} width={1200}>
                {data.map((d, index) => {
                    return (
                        <div key={index}>
                            <span>{d.key}</span>
                        </div>
                    );
                })}
            </ReactGridLayout>
            <JsonStringify {...metadata} />
            <JsonStringify {...original} />
        </section>
    );
};
