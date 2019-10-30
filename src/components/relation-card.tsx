import React, { FC } from 'react';

interface Props {
    relation: {
        id: string;
        type: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [x: string]: any;
    };
}

export const RelationCard: FC<Props> = ({ relation }) => {
    return <span>{`${relation.type}:${relation.id}`}</span>;
};
