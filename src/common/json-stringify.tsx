/* eslint-disable jsx-a11y/heading-has-content */
import React, { FC } from 'react';

export const JsonStringify: FC<any> = props => {
    let rest;
    if (props.noData) {
        const { data, noData, ...p } = props;
        rest = p;
    }

    return (
        <div style={{ margin: '1rem 0' }}>
            <h3 style={{ fontFamily: 'monospace' }} />
            <pre
                style={{
                    background: '#f6f8fa',
                    fontSize: '.65rem',
                    padding: '.5rem',
                    whiteSpace: 'pre',
                    overflowWrap: 'break-word',
                    wordWrap: 'break-word',
                }}
            >
                <code>
                    <strong>props</strong> = {JSON.stringify(rest, null, 4)}
                </code>
            </pre>
        </div>
    );
};
