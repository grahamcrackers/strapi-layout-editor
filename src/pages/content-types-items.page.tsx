import React, { useEffect, useState } from 'react';
// import { ContentTypeTable } from '../components/content-type-table';
import * as strapiService from '../services/strapi.service';
import { JsonStringify } from '../common/json-stringify';
import { ContentTypeTableHeaders } from '../components/content-type-table/table-headers';
import { ContentTypeTableBody } from '../components/content-type-table/table-body';

export const ContentTypeItems = props => {
    const [contentType, setContentType] = useState('');
    const [schema, setSchema] = useState<any>({});
    const [count, setCount] = useState(0);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const { contentType } = props.match.params;
        setContentType(contentType);

        const getContentTypesItems = async () => {
            const contentTypes = await strapiService.get(`content-manager/content-types/${contentType}?`);
            setSchema(contentTypes.data);
            const contentTypeCount = await strapiService.get(
                `content-manager/explorer/${contentType}/count?_limit=10&_sort=id:ASC&source=content-manager&_start=0`,
            );
            setCount(contentTypeCount.count);
            const contentTypeItems = await strapiService.get(
                `content-manager/explorer/${contentType}?_limit=10&_sort=id:ASC&source=content-manager&_start=0`,
            );
            setItems(contentTypeItems);
        };
        getContentTypesItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.match.params.contentType]);

    return (
        <div>
            <h1 className="f1 ttu tracked-tight mt0 mb0">{contentType}</h1>
            <p className="mt0">{count} entries found</p>
            <div className="pa4">
                <div className="overflow-auto">
                    <table className="f6 w-100 mw8 center" cellSpacing="0">
                        <ContentTypeTableHeaders layouts={schema.layouts} metadatas={schema.metadatas} />
                        <ContentTypeTableBody layouts={schema.layouts} items={items} />
                    </table>
                </div>
            </div>
            <JsonStringify {...schema} />
            <JsonStringify {...items} />
        </div>
    );
};
