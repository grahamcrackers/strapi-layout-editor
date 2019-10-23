import { EditLayouts } from 'interfaces/strapi/model-layouts.interface';
import { ModelMetadata } from 'interfaces/strapi/model-metadata.interface';
import { Layout } from 'react-grid-layout';
import { useModelItem } from './context/model-item.context';
import { useState, useEffect } from 'react';

/* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect, useState } from 'react';
// import { Layout } from 'react-grid-layout';
// import { EditLayouts } from 'interfaces/strapi/model-layouts.interface';
// import { ModelMetadata } from 'interfaces/strapi/model-metadata.interface';
// import { AttributeProps } from 'interfaces/strapi/model-schema.interface';
// import { MetaDataViews } from 'interfaces/strapi/attribute-metadatas.interface';

// export interface ModelLayout {
//     id: string;
//     modelType: string;
//     modelId: string;
//     layoutJson: Layout[];
// }

// export interface ContentDataLayouts {
//     list: boolean;
//     edit: false | Omit<EditLayouts, 'name'>;
//     editRelations: boolean;
//     grid: false | Layout;
// }

// export interface ContentData {
//     key: string;
//     value: any;
//     attributes: AttributeProps;
//     metadata: MetaDataViews;
//     layouts: ContentDataLayouts;
// }

export interface EditLayoutWithPos extends EditLayouts {
    x: number;
    y: number;
}

export const useItemLayouts = () => {
    const { metadata, filters, setFilters } = useModelItem();

    /**
     * Flatten the edit layout matrix but preserve the x, y positions in the array matrix
     */
    const flattenEditLayouts = (): EditLayoutWithPos[] => {
        const flattened: EditLayoutWithPos[] = [];
        if (metadata.layouts) {
            const editLayouts = metadata.layouts.edit;

            for (const yPos in editLayouts) {
                const editKey = editLayouts[yPos];
                for (const xPos in editKey) {
                    flattened.push({ ...editKey[xPos], y: +yPos, x: +xPos });
                }
            }
        }

        return flattened;
    };

    /**
     * Does the same thing as flattenEditLayouts() but will also provide the width and height for
     * react-grid-layout based on a 12 row grid
     */
    const calculateGridLayouts = (cols = 12): Layout[] => {
        const gridLayouts: Layout[] = [];

        if (metadata.layouts.edit) {
            const editLayouts = metadata.layouts.edit;
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
        }

        return gridLayouts.filter(layout => layout.i && !filters.includes(layout.i));
    };

    return {
        // Expose metadata and original data just as a reference
        filters,
        setFilters,
        editLayouts: flattenEditLayouts(),
        gridLayouts: calculateGridLayouts(),
    };
};
