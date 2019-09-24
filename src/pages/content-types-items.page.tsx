import React, { useEffect, useState } from 'react';
// import { ContentTypeTable } from '../components/content-type-table';
import * as strapiService from '../services/strapi.service';
import { JsonStringify } from '../common/json-stringify';

export const ContentTypeItems = props => {
    const [schema, setSchema] = useState({});
    const [count, setCount] = useState(0);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const getContentTypesItems = async () => {
            console.log(props.match);
            const uid = props.match.params.contentType;

            const contentTypes = await strapiService.get(`content-manager/content-types/${uid}?`);
            setSchema(contentTypes.data);

            const contentTypeCount = await strapiService.get(
                `content-manager/explorer/${uid}/count?_limit=10&_sort=id:ASC&source=content-manager&_start=0`,
            );
            setCount(contentTypeCount.count);

            const contentTypeItems = await strapiService.get(
                `content-manager/explorer/${uid}?_limit=10&_sort=id:ASC&source=content-manager&_start=0`,
            );
            setItems(contentTypeItems);
        };
        getContentTypesItems();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <JsonStringify {...items} />
        </div>
    );
};
