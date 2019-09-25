import React from 'react';
import { Link } from 'react-router-dom';
import { ContentTypeWithId } from './interfaces';

interface ContentTypeTableRowProps {
    data: ContentTypeWithId;
    filter: string[];
}

/** custom table row */
export const ContentTypeTableRow = ({ data, filter }: ContentTypeTableRowProps) => {
    return (
        <tr key={data.id} className="stripe-dark">
            {/* {layouts.list.map((attribute, index) => {
                return (
                    <td key={index} className="pa3">
                        {attribute === 'id' ? (
                            <Link to={`${location.pathname}/${row[attribute]}`}>{row[attribute]}</Link>
                        ) : (
                            row[attribute]
                        )}
                    </td>
                );
            })} */}
        </tr>
    );
};
