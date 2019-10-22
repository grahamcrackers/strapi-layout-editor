import React, { useContext } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import { useModelItem } from 'components/model-item/context/model-item.context';
import { ModelItemContext } from 'components/model-item/context';

const ReactGridLayout = WidthProvider(RGL);

export const GridLayouts = () => {
    // const { layouts, setLayouts } = useModelItem();
    const modelItemContext = useContext(ModelItemContext);
    const { layouts, setLayouts } = modelItemContext;

    console.log(layouts);
    if (!layouts) {
        return <div>loading...</div>;
    }

    return (
        <ReactGridLayout
            className="bg-gray-200"
            layout={layouts}
            onLayoutChange={layouts => {
                setLayouts(layouts);
            }}
        ></ReactGridLayout>
    );
};
