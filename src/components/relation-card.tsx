import React, { FC } from 'react';
import { useModel } from './model/context/model.context';

interface Props {
    relation: {
        id: string;
        type: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [x: string]: any;
    };
}

export const RelationCard: FC<Props> = ({ relation }) => {
    const { metadata } = useModel();
    return <span>{`${relation.type}:${relation.id}`}</span>;
};
