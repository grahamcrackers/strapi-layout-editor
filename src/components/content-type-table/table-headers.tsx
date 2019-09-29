import React, { useState, useEffect } from 'react';
import { Layouts, ContentTypeMetaData, ListFields } from './interfaces';

interface Props {
    layouts: Layouts;
    metadatas: { [name: string]: ContentTypeMetaData };
}

export const ContentTypeTableHeaders = ({ layouts, metadatas }: Props) => {
    const [headers, setHeaders] = useState<ListFields[]>([]);

    useEffect(() => {
        if (metadatas) {
            const contentTypeHeaders: ListFields[] = [];
            Object.keys(metadatas).forEach(attribute => {
                const header = metadatas[attribute].list;
                if (layouts.list.includes(attribute)) {
                    contentTypeHeaders.push(header);
                }
            });
            setHeaders([...contentTypeHeaders]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [layouts, metadatas]);

    return (
        <thead>
            <tr className="striped-dark">
                {headers.map((header, index) => (
                    <th key={index} className="text-sm font-semibold text-gray-700 p-2 bg-gray-100">
                        {header.label}
                    </th>
                ))}
            </tr>
        </thead>
    );
};
