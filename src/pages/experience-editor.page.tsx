import React, { useState, useEffect } from 'react';
import { get } from '../services/strapi.service';
import { JsonStringify } from '../common/json-stringify';

export const ExperienceEditorPage = props => {
    const [item, setItem] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const { contentType, itemId } = props.match.params;
            const result = await get(`content-manager/explorer/${contentType}/${itemId}`);
            console.log(result);
            setItem(result);
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div>
            <JsonStringify {...item} />
        </div>
    );
};
