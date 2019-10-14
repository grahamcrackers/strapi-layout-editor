/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { AttributeProps, EditLayout, MetaDataViews, Model } from '../../interfaces/strapi/strapi.interface';
import { get } from '../../services/strapi.service';
import { Layout } from 'react-grid-layout';

export interface ModelLayout {
    id: string;
    modelType: string;
    modelId: string;
    layoutJson: Layout[];
}

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

export const useContentData = (contentType, itemId) => {
    const ignoreProps: string[] = ['id', 'createdAt', 'updatedAt'];
    const [contentModel, setContentModel] = useState<Model>({} as Model);
    const [content, setContent] = useState<any>({});

    const [contentData, setContentData] = useState<ContentData[]>([]);
    const [layouts, setLayouts] = useState<Layout[]>([]);

    const [existingLayouts, setExistingLayouts] = useState<ModelLayout>();

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await get(`content-manager/content-types/${contentType}`);
            setContentModel(data);

            const result = await get(`content-manager/explorer/${contentType}/${itemId}`);
            setContent(result);

            // check to see if we already have any layouts
            const existingLayouts: ModelLayout = await get(
                `layout-editor/${contentType}/${itemId}/layouts?source=layout-editor`,
            );

            existingLayouts.layoutJson.length > 0 ? console.log('we got layouts') : console.log('no layouts yet');

            setExistingLayouts(existingLayouts);
        };
        fetchData();
        // only get data on component mount
    }, []);

    // since we are using useState to store our api data, we want to update
    // contentData and layouts once when an update is triggered, which should only be once
    useEffect(() => {
        const massageData = async () => {
            if (contentModel.layouts) {
                if (existingLayouts && existingLayouts.layoutJson) {
                    setLayouts(existingLayouts.layoutJson);
                } else {
                    const gridLayouts = await calculateGridLayouts(contentModel.layouts.edit);

                    setLayouts(gridLayouts);
                }

                const contentData = await buildContentData(contentModel, content);
                setContentData(contentData);
            }
        };
        massageData();
    }, [contentModel, content, existingLayouts]);

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
    const calculateGridLayouts = async (editLayouts: EditLayout[][], cols = 12): Promise<Layout[]> => {
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

        console.log(gridLayouts);
        return gridLayouts;
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

        const gridLayouts = layouts;
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
    const buildContentData = async (contentModel, content): Promise<ContentData[]> => {
        const data: ContentData[] = [];

        if (contentModel.schema) {
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

        return data.filter(d => !ignoreProps.includes(d.key));
    };

    return {
        // Expose metadata and original data just as a reference
        metadata: contentModel,
        original: content,
        data: contentData,
        layout: layouts,
        setLayout: setLayouts,
    };
};
