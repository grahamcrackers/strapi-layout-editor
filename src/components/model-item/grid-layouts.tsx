import { useModelItem } from 'components/model-item/context/model-item.context';
import { useItemLayouts } from 'components/model-item/use-item-layouts';
import React from 'react';
import RGL, { Layout, WidthProvider } from 'react-grid-layout';

const ReactGridLayout = WidthProvider(RGL);

export const GridLayouts = () => {
    const { layouts, setLayouts } = useModelItem();
    const { attributeLayouts, relationalLayouts, relationalData } = useItemLayouts();
    console.log(layouts);

    // relational data won't have the right y positions, but they
    // will change based on what is filtered
    const adjustRelationYPos = () => {
        let adjusted: Layout[] = [];
        const yPostions: number[] = attributeLayouts.map(x => x.y);

        // if no yPositions give a value of 0
        const adjPos = yPostions.length ? Math.max(...yPostions) : 0;

        for (const layout of relationalLayouts) {
            adjusted = [...adjusted, { ...layout, y: layout.y + adjPos }];
        }
        return adjusted;
    };

    const combineLayouts = (attributes: Layout[]) => {
        return [...attributes, ...adjustRelationYPos()];
    };

    if (!layouts) {
        return <div>loading...</div>;
    }

    return (
        <>
            <ReactGridLayout
                className="bg-gray-200"
                layout={combineLayouts(attributeLayouts)}
                onLayoutChange={changedLayouts => {
                    // console.log(changedLayouts);
                    setLayouts(changedLayouts);
                }}
            >
                {/* Layout the metadata edit fields */}
                {attributeLayouts.map(({ i }) => {
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
