import React, { FC } from 'react';
import { Layout } from 'react-grid-layout';

export const StringifyLayout: FC<{ layout: Layout[] }> = ({ layout }) => {
    return (
        <div className="layoutJSON">
            Displayed as <code>[x, y, w, h]</code>:
            <div className="columns">
                {layout.map((l: Layout) => (
                    <div className="layoutItem" key={l.i}>
                        <b>{l.i}</b>: [{l.x}, {l.y}, {l.w}, {l.h}]
                    </div>
                ))}
            </div>
        </div>
    );
};
