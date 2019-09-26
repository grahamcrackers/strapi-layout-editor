import React, { FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';

export const NavLink: FC<LinkProps> = props => {
    return <Link className="link dim gray f6 f5-ns dib mr3" {...props} />;
};
