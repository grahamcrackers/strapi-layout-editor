import React, { useEffect, useState } from 'react';
// import { ContentTypeTable } from '../components/content-type-table';
import * as strapiService from '../services/strapi.service';
import { JsonStringify } from '../common/json-stringify';
import { ContentTypeTableHeaders } from '../components/content-type-table/table-headers';
import { ContentTypeTableBody } from '../components/content-type-table/table-body';
import { useParams } from 'react-router-dom';
import { Table } from '../ui/table';

export const ContentTypeItems = () => {
    const { contentType } = useParams();

    const [schema, setSchema] = useState<any>({});
    const [count, setCount] = useState(0);
    const [items, setItems] = useState([]);

    useEffect(() => {
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
    }, [contentType]);

    return (
        <div className="p-4">
            <h1 className="mb-1 leading-none text-color-900 text-4xl font-light capitalize">{contentType}</h1>
            <p className="mt-0 mb-4 text-gray-600">{count} entries found</p>
            <hr className="my-8 border-b-2 border-gray-200" />

            <Table>
                <ContentTypeTableHeaders layouts={schema.layouts} metadatas={schema.metadatas} />
                <ContentTypeTableBody layouts={schema.layouts} items={items} />
            </Table>

            {/* <JsonStringify {...schema} /> */}
            {/* <JsonStringify {...items} /> */}
        </div>
    );
};
