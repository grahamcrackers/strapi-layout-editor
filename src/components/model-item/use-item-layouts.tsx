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
    const { metadata, item, filters, setFilters, layouts } = useModelItem();

    // filter relational data fields
    const relations = Object.keys(item)
        // get just relational fields
        .filter(key => (metadata.layouts || metadata.contentType.layouts).editRelations.includes(key))
        // check if it's not in filters and if it is not null
        .filter(key => !filters.includes(key) && item[key]);

    /**
     * Does the same thing as flattenEditLayouts() but will also provide the width and height for
     * react-grid-layout based on a 12 row grid
     */
    const getAttributeLayouts = (cols = 12): Layout[] => {
        const attrLayouts: Layout[] = [];

        if ((metadata.layouts || metadata.contentType.layouts).edit) {
            const editLayouts = (metadata.layouts || metadata.contentType.layouts).edit;
            for (const yPos in editLayouts) {
                const editKey = editLayouts[yPos];
                let startingPos = 0; // add each objects size

                for (const xPos in editKey) {
                    const obj = editKey[xPos];
                    const layoutIndex = layouts.findIndex(l => l.i === obj.name);
                    let x = startingPos;
                    let y = +yPos;
                    let w = obj.size;
                    let h = 1;
                    if (layoutIndex > -1) {
                        x = layouts[layoutIndex].x;
                        y = layouts[layoutIndex].h;
                        w = layouts[layoutIndex].w;
                        h = layouts[layoutIndex].h;
                        startingPos = w + x;
                    }

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
                    console.log({ i: obj.name, x, y, w, h });
                    attrLayouts.push({ i: obj.name, x, y, w, h });
                    // }
                }
            }
        }

        return attrLayouts.filter(layout => layout.i && !filters.includes(layout.i));
    };

    const getRelationalLayouts = () => {
        let attrLayouts: Layout[] = [];

        for (const r of relations) {
            let collection: any[] = [];
            const collectionItem = item[r];
            if (collectionItem) {
                if (Array.isArray(collectionItem)) {
                    collection = collectionItem;
                } else {
                    collection = [collectionItem];
                }
            }

            for (const i in collection) {
                const layoutIndex = layouts.findIndex(l => l.i === collection[i].id);
                let x = 1;
                let y = +i;
                let w = 12;
                let h = 1;
                if (layoutIndex > -1) {
                    x = layouts[layoutIndex].x;
                    y = layouts[layoutIndex].h;
                    w = layouts[layoutIndex].w;
                    h = layouts[layoutIndex].h;
                }
                // default our width to 12 and height to 1, let RGL handle positioning
                const relLayout = { i: collection[i].id, x, y, w, h } as Layout;
                attrLayouts = [...attrLayouts, relLayout];
            }
        }

        return attrLayouts;
    };

    /** assigning minimal layout data for a relation */
    const getRelationalData = (): any[] => {
        let data: any[] = [];

        for (const r of relations) {
            // will error if array is empty
            let relationalItems: any[] = [];
            const relationalItem = item[r];
            if (relationalItem) {
                if (Array.isArray(relationalItem)) {
                    relationalItems = relationalItem;
                } else {
                    relationalItems = [relationalItem];
                }
            }

            if (relationalItems.length) {
                // probably not the best place to do this but we need the relation type on
                // the objects being passed through
                const items = relationalItems.map(i => ({ type: r, ...i }));
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
