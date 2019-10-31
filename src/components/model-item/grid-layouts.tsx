import { useModelItem } from 'components/model-item/context/model-item.context';
import { useItemLayouts } from 'components/model-item/use-item-layouts';
import React from 'react';
import RGL, { Layout, WidthProvider } from 'react-grid-layout';
import { RelationCard } from '../relation-card';
import { ModelImagePreview } from 'components/model/model-image-preview';

const ReactGridLayout = WidthProvider(RGL);

export const GridLayouts = () => {
    const { layouts, setLayouts } = useModelItem();
    const { item, attributeLayouts, relationalLayouts, relationalData } = useItemLayouts();

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

    const imageTypes = ['image', 'previewImage'];

    return (
        <>
            <ReactGridLayout
                className="bg-gray-200"
                layout={combineLayouts(attributeLayouts)}
                onLayoutChange={changedLayouts => {
                    setLayouts(changedLayouts);
                }}
            >
                {/* Layout the metadata edit fields */}
                {attributeLayouts.map(({ i }) => {
                    console.log(i);
                    const index = i as string;
                    if (imageTypes.includes(index)) {
                        return (
                            <div key={i} className="rounded shadow bg-white z-10">
                                <ModelImagePreview image={item[index]} className="h-full w-full object-contain" />
                            </div>
                        );
                    } else {
                        return (
                            <div key={i} className="rounded shadow bg-white">
                                <div className="px-2 border-b-2">{i}</div>
                                <div className="p-2">{item[i as string]}</div>
                            </div>
                        );
                    }
                })}
                {relationalData.map(relation => {
                    return (
                        <div key={relation.id} className="rounded shadow bg-white">
                            <RelationCard relation={relation} />
                        </div>
                    );
                })}
            </ReactGridLayout>
        </>
    );
};
