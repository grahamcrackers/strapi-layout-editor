import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { get } from 'services/strapi.service';
import { Layout } from 'react-grid-layout';

export const GridPreview = () => {
    const { contentType, itemId } = useParams();
    const [data, setData] = useState({});
    const [layouts, setLayouts] = useState<Layout[]>([]);
    const [fields, setFields] = useState<string[]>([]);

    useEffect(() => {
        const getData = async () => {
            const result = await get(`content-manager/explorer/${contentType}/${itemId}`);
            setData(result);

            const { layoutJson } = await get(`layout-editor/${contentType}/${itemId}/layouts?source=layout-editor`);
            setLayouts(layoutJson);
            setFields(
                Object.keys(layoutJson).map(l => {
                    const name = layoutJson[l].i;
                    // if (name === 'isPost' || name === 'title') return name;
                    return name;
                }),
            );
        };
        getData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="p-4 pl-0 w-full">
            <h1>Grid Preview</h1>
            <div className="grid">
                {data &&
                    Object.keys(data)
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
                {/* {data.map(d => {
                    return <div></div>
                })}
                <div className="grid-item">1</div>
                <div className="grid-item">2</div>
                <div className="grid-item">3</div>
                <div className="grid-item">4</div>
                <div className="grid-item">5</div>
                <div className="grid-item">6</div>
                <div className="grid-item">7</div>
                <div className="grid-item">8</div> */}
            </div>
        </div>
    );
};
