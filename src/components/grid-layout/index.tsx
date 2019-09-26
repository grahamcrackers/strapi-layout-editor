import React, { FC, useState } from 'react';
import _ from 'lodash';
import RGL, { WidthProvider, Layout } from 'react-grid-layout';

const ReactGridLayout = WidthProvider(RGL);

const StringifyLayout: FC<{ layout: Layout[] }> = ({ layout }): any => {
    return layout.map((l: Layout) => (
        <div className="layoutItem" key={l.i}>
            <b>{l.i}</b>: [{l.x}, {l.y}, {l.w}, {l.h}]
        </div>
    ));
};

const generateLayout = props => {
    return _.map(new Array(props.items), function(item, i) {
        const y = _.result(props, 'y') || Math.ceil(Math.random() * 4) + 1;
        return {
            x: (i * 2) % 12,
            y: Math.floor(i / 6) * (y as number),
            w: 2,
            h: y as number,
            i: i.toString(),
        };
    });
};

export const BasicLayout = () => {
    const [props] = useState({
        className: 'layout',
        items: 3,
        rowHeight: 30,
        cols: 12,
    });
    const [layout, setLayout] = useState<Layout[]>(generateLayout(props));

    const generateDOM = () => {
        return _.map(_.range(props.items), function(i) {
            return (
                <div key={i}>
                    <span className="text">{i}</span>
                </div>
            );
        });
    };

    return (
        <>
            <div className="layoutJSON">
                Displayed as <code>[x, y, w, h]</code>:
                <div className="columns">
                    <StringifyLayout layout={layout} />
                </div>
            </div>
            <ReactGridLayout layout={layout} onLayoutChange={(layout: Layout[]) => setLayout(layout)}>
                {generateDOM()}
            </ReactGridLayout>
        </>
    );
};
