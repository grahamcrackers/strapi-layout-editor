import React, { FC, DetailedHTMLProps, HTMLAttributes } from 'react';

export const THead: FC<DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>> = props => {
    return <thead {...props} />;
};
