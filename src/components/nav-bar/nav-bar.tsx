import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../ui/header';

import ServiceMasterLogo from 'assets/img/stamp.svm.svg';
import plus from 'assets/icons/plus.svg';
import StrapiLogo from 'assets/img/logo.strapi.svg';
import { NavButton } from './nav-button';

export const NavBar = () => {
    return (
        <Header>
            <Link to="/dashboard" className="flex flex-row text-center px-4 py-2 m-2">
                <img src={ServiceMasterLogo} alt="ServiceMaster Logo" />
                <img src={plus} className="px-3" alt="plus" />
                <img src={StrapiLogo} width="40px" alt="Strapi Logo" />
            </Link>
            <NavButton />
        </Header>
    );
};
