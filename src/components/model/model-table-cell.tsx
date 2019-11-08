import React, { FC } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { ImagePreview } from '../image-preview/image-preview';

interface Props {
    attribute: any;
    row: any;
}

export const ModelTableCell: FC<Props> = ({ attribute, row }) => {
    const location = useLocation();

    const imageTypes = ['image', 'previewImage'];

    return (
        <>
            {/* make the id a link */}
            {/* {attribute === 'id' && (
                <Link className="hover:underline" to={`${location.pathname}/${row[attribute]}`}>
                    {row[attribute]}
                </Link>
            )} */}

            {/* if we have an image */}
            {imageTypes.includes(attribute) && (
                <ImagePreview image={row[attribute]} className="h-8 w-8 object-cover object-left" />
            )}

            {/* if it's not an id or an image type */}
            {![...imageTypes].includes(attribute) && row[attribute]}
        </>
    );
};
