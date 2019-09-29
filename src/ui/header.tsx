import React, { FC } from 'react';

export const Header: FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>> = props => {
    return <header className="fixed flex flex-row bg-gray-200 justify-between h-16 w-full" {...props}></header>;
};
