import { useEffect, useState } from 'react';
import { AttributeProps, EditLayout, MetaDataViews, Model } from '../../interfaces/strapi/strapi.interface';
import { get } from '../../services/strapi.service';
import { Layout } from 'react-grid-layout';

export interface ContentDataLayouts {
    list: boolean;
    edit: false | Omit<EditLayout, 'name'>;
    editRelations: boolean;
    grid: Layout;
}

export interface ContentData {
    // id: string;
    key: string;
    value: any;
    attributes: AttributeProps;
    metadata: MetaDataViews;
    layouts: ContentDataLayouts;
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

    const flattenEditLayout = (): EditLayout[] => {
        const flattened: EditLayout[] = [];
        if (contentModel) {
            const editLayouts = contentModel.layouts.edit;

            for (const key in editLayouts) {
                const editKey = editLayouts[key];

                for (const obj of editKey) {
                    flattened.push(obj);
                }
            }
        }

        return flattened;
    };

    const calculateGrid = () => {
        if (contentModel) {
            const editLayouts = contentModel.layouts.edit;

            for (const yPos in editLayouts) {
                console.log(yPos);
                // const editKey = editLayouts[key];
                // for (const obj of editKey) {
                // }
            }
        }
    };

    const getEditLayout = (property?: string): false | Omit<EditLayout, 'name'> => {
        let layout: false | Omit<EditLayout, 'name'> = false;
        const editLayouts = flattenEditLayout();
        for (const k of editLayouts) {
            if (k.name === property) {
                layout = { size: k.size };
            }
        }

        return layout;
    };

    /**
     * Creates a more easily consumable format
     * so the react component can map over it's properties easier
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
                        edit: getEditLayout(),
                        editRelations: layouts.editRelations.includes(property),
                        grid: { i: 'c', x: 0, y: 0, w: 1, h: 2 },
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
