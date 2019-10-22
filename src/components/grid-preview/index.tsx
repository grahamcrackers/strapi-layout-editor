import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Layout } from 'react-grid-layout';
import { useModelItem } from 'components/model-item/context/model-item.context';

export const GridPreview = () => {
    const { contentType, itemId } = useParams();
    const { item, layouts } = useModelItem();
    // const [layouts, setLayouts] = useState<Layout[]>([]);
    const [fields, setFields] = useState<string[]>([]);

    useEffect(() => {
        // const { layoutJson } = layouts;
        // setFields(
        //     Object.keys(layoutJson).map(l => {
        //         const name = layoutJson[l].i;
        //         // if (name === 'isPost' || name === 'title') return name;
        //         return name;
        //     }),
        // );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="p-4 pl-0 w-full">
            <h1>Grid Preview</h1>
            <div className="grid">
                {item &&
                    Object.keys(item)
                        .filter(d => fields.includes(d))
                        // .filter(d => d === 'isPost' || d === 'title')
                        .map(key => {
                            const layout: Layout = layouts.filter(l => l.i === key)[0];
                            const { x, y, w, h } = layout;
                            return (
                                <div
                                    key={key}
                                    className="grid-item"
                                    style={{
                                        gridColumn: `${x + 1} / ${x + w + 1}`,
                                        gridRow: `${y + 1} / ${y + h + 1}`,
                                    }}
                                >
                                    {key}
                                </div>
                            );
                        })}
            </div>
        </div>
    );
};
