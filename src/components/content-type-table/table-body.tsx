import React, { useState, useEffect } from 'react';
import { Layouts } from './interfaces';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

interface Props extends RouteComponentProps {
    layouts: Layouts;
    items: any[];
}

export const ContentTypeTableBody = ({ layouts, items, match, location }: Props) => {
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
                // console.log(`${property}: ${row[property]}`);
            }
            rows.push(newObj);
        });

        return rows;
    };

    useEffect(() => {
        if (items) {
            const bodyData = getRowsData(items);
            setRows(bodyData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [layouts, items]);
    console.log(match);
    console.log(location);
    return (
        <tbody className="lh-copy">
            {rows &&
                rows.map(row => (
                    <tr key={row.id} className="stripe-dark">
                        {layouts.list.map((attribute, index) => {
                            return (
                                <td key={index} className="pa3">
                                    {attribute === 'id' ? (
                                        <Link to={`${location.pathname}/${row[attribute]}`}>{row[attribute]}</Link>
                                    ) : (
                                        row[attribute]
                                    )}
                                </td>
                            );
                        })}
                    </tr>
                ))}
        </tbody>
    );
};