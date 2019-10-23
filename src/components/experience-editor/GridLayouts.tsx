import React, { useContext } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import { useModelItem } from 'components/model-item/context/model-item.context';
import { ModelItemContext } from 'components/model-item/context';
import { useItemLayouts } from 'components/model-item/use-item-layouts';

const ReactGridLayout = WidthProvider(RGL);

export const GridLayouts = () => {
    const { metadata, layouts, setLayouts, item } = useModelItem();
    const { editLayouts, filters } = useItemLayouts();

    console.log(layouts);
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
            layout={layouts}
            onLayoutChange={layouts => {
                setLayouts(layouts);
            }}
        >
            {editLayouts.map((layout, index) => {
                return <div key={index}>{JSON.stringify(layout)}</div>;
            })}
        </ReactGridLayout>
    );
};
