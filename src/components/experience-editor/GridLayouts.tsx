import React, { useContext } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import { useModelItem } from 'components/model-item/context/model-item.context';
import { ModelItemContext } from 'components/model-item/context';
import { useItemLayouts } from 'components/model-item/use-item-layouts';

const ReactGridLayout = WidthProvider(RGL);

export const GridLayouts = () => {
    const { metadata, layouts, setLayouts, item, filters } = useModelItem();
    const { editLayouts, gridLayouts } = useItemLayouts();

    console.log(filters);
    if (!layouts) {
        return <div>loading...</div>;
    }

    // return (
    //     <ul>
    //         {editLayouts.map((layout, index) => {
    //             return <li key={index}>{JSON.stringify(layout)}</li>;
    //         })}
    //     </ul>
    // );
    return (
        <ReactGridLayout
            className="bg-gray-200"
            layout={gridLayouts}
            onLayoutChange={changedLayouts => {
                setLayouts(changedLayouts);
            }}
        >
            {gridLayouts.map((layout, index) => {
                return (
                    <div key={layout.i} className="rounded shadow bg-white">
                        <span>{layout.i}</span>
                        <div>{JSON.stringify(layout)}</div>
                    </div>
                );
            })}
        </ReactGridLayout>
    );
};
