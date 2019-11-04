/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { EditLayouts } from 'interfaces/strapi/model-layouts.interface';
import { Layout } from 'react-grid-layout';
import { useModelItem } from './context/model-item.context';
import { useMemo } from 'react';

export interface EditLayoutWithPos extends EditLayouts {
    x: number;
    y: number;
}

export const useItemLayouts = () => {
    const { metadata, item, filters, setFilters } = useModelItem();

    // filter relational data fields
    const relations = Object.keys(item)
        // get just relational fields
        .filter(key => metadata.layouts.editRelations.includes(key))
        // check if it's not in filters and if it is not null
        .filter(key => !filters.includes(key) && item[key]);

    /**
     * Does the same thing as flattenEditLayouts() but will also provide the width and height for
     * react-grid-layout based on a 12 row grid
     */
    const getAttributeLayouts = (cols = 12): Layout[] => {
        const layouts: Layout[] = [];

        if (metadata.layouts.edit) {
            const editLayouts = metadata.layouts.edit;
            for (const yPos in editLayouts) {
                const editKey = editLayouts[yPos];
                let startingPos = 0; // add each objects size

                for (const xPos in editKey) {
                    const obj = editKey[xPos];
                    const x = startingPos;
                    startingPos = startingPos + obj.size;

                    // if content is rich text editor, give it a bigger height
                    // if (metadata.schema.attributes[obj.name].type === 'richtext') {
                    //     layouts.push({ i: obj.name, x, y: +yPos, w: obj.size, h: 5, minH: 1 });
                    // } else {
                    /*
                    It looks like strapi bases it's width on a 12 col layout, so we are using the size from the
                    metadata. Height is set to 1 as a default to lay out the data on the page.
                    TODO: if we want to open this up to be actually customizable, we need to customize
                    to different column sizes.
                    */
                    layouts.push({ i: obj.name, x, y: +yPos, w: obj.size, h: 1 });
                    // }
                }
            }
        }

        return layouts.filter(layout => layout.i && !filters.includes(layout.i));
    };

    const getRelationalLayouts = () => {
        let layouts: Layout[] = [];

        for (const r of relations) {
            const collection = item[r];
            for (const i in collection) {
                // default our width to 12 and height to 1, let RGL handle positioning
                const layout = { i: collection[i].id, x: 1, y: +i, w: 12, minH: 1 } as Layout;
                layouts = [...layouts, layout];
            }
        }

        return layouts;
    };

    /** assigning minimal layout data for a relation */
    const getRelationalData = (): any[] => {
        let data: any[] = [];

        for (const r of relations) {
            // will error if array is empty
            if (item[r].length) {
                // probably not the best place to do this but we need the relation type on
                // the objects being passed through
                const items = item[r].map(i => ({ type: r, ...i }));
                data = [...data, ...items];
            }
        }

        return data;
    };

    /**
     * only send over the most relevent information for the item, if we don't care about an attribute, this is
     * the place to trim it away
     */
    const pruneItem = () => {
        const filtered = Object.keys(item)
            .filter(key => !filters.includes(key))
            .reduce((obj, key) => {
                return { ...obj, [key]: item[key] };
            }, {});

        return filtered;
    };

    return {
        filters,
        setFilters,
        // we only want to recalculate these if item or filters has changed
        attributeLayouts: useMemo(() => getAttributeLayouts(), [item, filters]),
        relationalLayouts: useMemo(() => getRelationalLayouts(), [item, filters]),
        relationalData: useMemo(() => getRelationalData(), [item, filters]),
        item: useMemo(() => pruneItem(), [item, filters]),
    };
};
