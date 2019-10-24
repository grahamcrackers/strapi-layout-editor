import React, { FC } from 'react';

export const Header: FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>> = props => {
    return <header className="fixed flex flex-row h-16 w-full shadow bg-white z-50" {...props}></header>;
};
