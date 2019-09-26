import { useEffect, useState } from 'react';
import { AttributeProps, EditLayout, MetaDataViews, Model } from '../../interfaces/strapi/strapi.interface';
import { get } from '../../services/strapi.service';
import { Layout } from 'react-grid-layout';

export interface ContentDataLayouts {
    list: boolean;
    edit: false | Omit<EditLayout, 'name'>;
    editRelations: boolean;
    grid: false | Layout;
}

export interface ContentData {
    key: string;
    value: any;
    attributes: AttributeProps;
    metadata: MetaDataViews;
    layouts: ContentDataLayouts;
}

export interface EditLayoutWithPos extends EditLayout {
    x: number;
    y: number;
}

export const useContentData = (contentType, itemId, ignoreProps: string[] = []) => {
    const [contentModel, setContentModel] = useState<Model>();
    const [content, setContent] = useState<any>({});

    useEffect(() => {
        // get model and model data
        const fetchData = async () => {
            const model = await get(`content-manager/content-types/${contentType}`);
            setContentModel(model.data);

            const result = await get(`content-manager/explorer/${contentType}/${itemId}`);
            setContent(result);
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Flatten the edit layout matrix but preserve the x, y positions in the array matrix
     */
    const flattenEditLayouts = (): EditLayoutWithPos[] => {
        const flattened: EditLayoutWithPos[] = [];
        if (contentModel) {
            const editLayouts = contentModel.layouts.edit;

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
    const calculateGridLayouts = (): Layout[] => {
        const layouts: Layout[] = [];
        if (contentModel) {
            const editLayouts = contentModel.layouts.edit;

            for (const yPos in editLayouts) {
                const editKey = editLayouts[yPos];
                for (const xPos in editKey) {
                    const obj = editKey[xPos];

                    /* 
                       It looks like strapi bases it's width on a 12 col layout, so we are using the size from the 
                       metadata. Height is set to 1 as a default to lay out the data on the page. 
                       TODO: if we want to open this up to be actually customizable, we need to customize
                       to different column sizes.                       
                    */
                    layouts.push({ i: obj.name, x: +xPos, y: +yPos, w: obj.size, h: 1 });
                }
            }
        }

        return layouts;
    };

    const getEditLayout = (property: string): false | Omit<EditLayout, 'name'> => {
        let layout: false | Omit<EditLayout, 'name'> = false;

        const editLayouts = flattenEditLayouts();
        for (const k of editLayouts) {
            if (k.name === property) {
                layout = { size: k.size };
            }
        }

        return layout;
    };

    const getGridLayout = (property: string): false | Layout => {
        let layout: false | Layout = false;

        const gridLayouts = calculateGridLayouts();
        for (const grid of gridLayouts) {
            if (grid.i === property) {
                layout = grid;
            }
        }

        return layout;
    };

    /**
     * Creates a more easily consumable format so the react component can map
     * over the content properties easier
     */
    const buildContentData = (): ContentData[] => {
        const data: ContentData[] = [];

        if (contentModel && content) {
            const { schema, metadatas, layouts } = contentModel;
            for (const property in schema.attributes) {
                const contentData: ContentData = {
                    key: property,
                    value: content[property],
                    attributes: schema.attributes[property],
                    metadata: metadatas[property],
                    layouts: {
                        list: layouts.list.includes(property),
                        edit: getEditLayout(property),
                        editRelations: layouts.editRelations.includes(property),
                        grid: getGridLayout(property),
                    },
                };
                data.push(contentData);
            }
        }

        return data.filter(d => !ignoreProps.includes(d.key)).filter(d => d.layouts.list);
    };

    return {
        metadata: contentModel,
        original: content,
        data: buildContentData(),
    };
};
