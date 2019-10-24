import { useModelItem } from 'components/model-item/context/model-item.context';
import { useItemLayouts } from 'components/model-item/use-item-layouts';
import React from 'react';
import RGL, { WidthProvider, Layout } from 'react-grid-layout';
import { JsonStringify } from 'common/json-stringify';

const ReactGridLayout = WidthProvider(RGL);

export const GridLayouts = () => {
    const { metadata, layouts, setLayouts, filters } = useModelItem();
    const { gridLayouts, relationalLayouts, relationalData, item } = useItemLayouts();

    // relational data won't have the right y positions, but they
    // will change based on what is filtered
    const adjustRelationYPos = () => {
        let adjusted: Layout[] = [];
        const yPostions: number[] = gridLayouts.map(x => x.y);
        const adjPos = Math.max(...yPostions);

        for (const layout of relationalLayouts) {
            adjusted = [...adjusted, { ...layout, y: layout.y + adjPos }];
        }
        return adjusted;
    };

    if (!layouts) {
        return <div>loading...</div>;
    }

    return (
        <>
            <ReactGridLayout
                className="bg-gray-200"
                layout={[...gridLayouts, ...adjustRelationYPos()]}
                onLayoutChange={changedLayouts => {
                    setLayouts(changedLayouts);
                }}
            >
                {/* Layout the metadata edit fields */}
                {gridLayouts.map(({ i }) => {
                    return (
                        <div key={i} className="rounded shadow bg-white">
                            <span>{i}</span>
                            {/* TODO: Display actual data */}
                            {/* <div>{JSON.stringify(item[i as string])}</div> */}
                        </div>
                    );
                })}
                {relationalData.map(relation => {
                    return (
                        <div key={relation.id} className="rounded shadow bg-white">
                            <span>{relation.id}</span>
                            {/* TODO: Display actual data */}
                            {/* <div>{JSON.stringify(relation)}</div> */}
                        </div>
                    );
                })}
            </ReactGridLayout>
        </>
    );
};
