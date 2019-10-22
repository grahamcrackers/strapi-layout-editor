import { EditLayouts } from 'interfaces/strapi/model-layouts.interface';
import { ModelMetadata } from 'interfaces/strapi/model-metadata.interface';
import { Layout } from 'react-grid-layout';

export const useModelMetadata = (metadata: ModelMetadata) => {
    /**
     * Does the same thing as flattenEditLayouts() but will also provide the width and height for
     * react-grid-layout based on a 12 row grid
     */
    const calculateGridLayouts = async (editLayouts: EditLayouts[][], cols = 12): Promise<Layout[]> => {
        const gridLayouts: Layout[] = [];

        for (const yPos in editLayouts) {
            const editKey = editLayouts[yPos];
            let startingPos = 0; // add each objects size

            for (const xPos in editKey) {
                const obj = editKey[xPos];
                const x = startingPos;
                startingPos = startingPos + obj.size;

                /* 
                    It looks like strapi bases it's width on a 12 col layout, so we are using the size from the 
                    metadata. Height is set to 1 as a default to lay out the data on the page. 
                    TODO: if we want to open this up to be actually customizable, we need to customize
                    to different column sizes.                       
                */
                gridLayouts.push({ i: obj.name, x, y: +yPos, w: obj.size, h: 1 });
            }
        }

        return gridLayouts;
    };
};
