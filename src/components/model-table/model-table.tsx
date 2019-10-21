import React, { useContext, useEffect } from 'react';
import { ModelContext } from '../../contexts/ModelContext';
// import { Layouts } from 'components/content-type-table/interfaces';

export const ModelTable = () => {
    const { metadata } = useContext(ModelContext);

    const headers = Object.entries(metadata.metadatas).filter(key => {
        return metadata.layouts.list.includes(key[0]);
    });

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
        </table>
    );
};
