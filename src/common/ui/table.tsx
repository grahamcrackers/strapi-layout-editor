import React, { DetailedHTMLProps, TableHTMLAttributes, FC } from 'react';

export const Table: FC<DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>> = ({
    className,
    ...rest
}) => {
    return <table className={`w-full text-left table-collapse ${className}`} {...rest} />;
};
