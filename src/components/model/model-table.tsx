/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react';
import { ModelContext } from './context';
import { ModelTableCell } from './model-table-cell';

export const ModelTable = () => {
    const { metadata, items } = useContext(ModelContext);
    const [rows, setRows] = useState<any[]>([]);

    const headers = Object.entries(metadata.metadatas).filter(key => {
        return metadata.layouts.list.includes(key[0]);
    });

    /////// UUUUUUUUGH TODO: CLEAN THIS UP
    const getRowsData = (items: any) => {
        const rows: any[] = [];
        // get data from object of object
        Object.keys(items).forEach(item => {
            const row = items[item];
            const newObj = {};
            for (const property in row) {
                if (metadata.layouts.list.includes(property)) {
                    newObj[`${property}`] = row[property];
                }
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
    }, [metadata.layouts, items]);

    return (
        <table className="w-full text-left table-collapse border">
            <thead>
                <tr className="striped-dark">
                    {headers.map(([key, layouts]) => {
                        return (
                            <th key={key} className="text-sm font-semibold text-gray-700 p-2 bg-gray-100">
                                {layouts.list.label}
                            </th>
                        );
                    })}
                </tr>
            </thead>
            <tbody className="align-baseline">
                {rows &&
                    rows.map(row => (
                        <tr key={row.id}>
                            {metadata.layouts.list.map((attribute, index) => {
                                return (
                                    <td
                                        key={index}
                                        className="p-2 border-t border-gray-300 font-mono text-xs text-blue-700"
                                    >
                                        <ModelTableCell attribute={attribute} row={row} />
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
            </tbody>
        </table>
    );
};
