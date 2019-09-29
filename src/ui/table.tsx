import React, { DetailedHTMLProps, TableHTMLAttributes, FC } from 'react';

export const Table: FC<DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>> = props => {
    return <table className="w-full text-left table-collapse" {...props} />;
};
