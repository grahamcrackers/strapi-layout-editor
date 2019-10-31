import React, { FC } from 'react';
import { isEmpty } from 'utils/isEmpty';

export interface ImageObject {
    createdAt: string;
    ext: string;
    hash: string;
    id: string;
    mime: string;
    name: string;
    provider: string;
    related: string[];
    sha256: string;
    size: string;
    updatedAt: string;
    url: string;
    __v: number;
    _id: string;
}

interface Props {
    image: ImageObject;
    className?: string;
}

export const ModelImagePreview: FC<Props> = ({ image, className }) => {
    if (isEmpty(image)) {
        return <div>N/A</div>;
    }

    return <img className={className} src={image.url} alt="model table preview"></img>;
};
