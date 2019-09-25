import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { JsonStringify } from '../common/json-stringify';
import { get } from '../services/strapi.service';

export const ExperienceEditorPage = props => {
    const { contentType, itemId } = useParams();
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
