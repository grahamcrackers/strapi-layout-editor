import React, { useState, useEffect } from 'react';
import { Layouts } from './interfaces';
import { Link, useLocation } from 'react-router-dom';

interface Props {
    layouts: Layouts;
    items: any[];
}

export const ContentTypeTableBody = ({ layouts, items }: Props) => {
    const location = useLocation();
    const [rows, setRows] = useState<any[]>([]);

    const getRowsData = (items: any) => {
        const rows: any[] = [];
        // get data from object of object
        Object.keys(items).forEach(item => {
            const row = items[item];
            const newObj = {};
            for (const property in row) {
                if (layouts.list.includes(property)) {
                    newObj[`${property}`] = row[property];
                }
            }
            rows.push(newObj);
        });

        console.log(rows);
        return rows;
    };

    useEffect(() => {
        if (items) {
            const bodyData = getRowsData(items);
            setRows(bodyData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [layouts, items]);

    /* these fields don't just display text, this is rough and dirty for now */
    const specialSnowflakes = ['id', 'previewImage'];

    return (
        <tbody className="align-baseline">
            {rows &&
                rows.map(row => (
                    <tr key={row.id}>
                        {layouts.list.map((attribute, index) => {
                            console.log(attribute);
                            return (
                                <td
                                    key={index}
                                    className="p-2 border-t border-gray-300 font-mono text-xs text-blue-700 whitespace-pre"
                                >
                                    {attribute === 'id' && (
                                        <Link to={`${location.pathname}/${row[attribute]}`}>{row[attribute]}</Link>
                                    )}
                                    {attribute === 'previewImage' && <div>TODO: Display Image</div>}
                                    {!specialSnowflakes.includes(attribute) && row[attribute]}
                                </td>
                            );
                        })}
                    </tr>
                ))}
        </tbody>
    );
};
