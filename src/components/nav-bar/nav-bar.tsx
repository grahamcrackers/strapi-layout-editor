import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../ui/header';

import ServiceMasterLogo from 'assets/img/stamp.svm.svg';
import plus from 'assets/icons/plus.svg';
import StrapiLogo from 'assets/img/logo.strapi.svg';
import { NavButton } from './nav-button';
import { AuthButton } from './auth-button';

export const NavBar = () => {
    return (
        <Header>
            <Link to="/dashboard" className="flex flex-row text-center px-4 py-2 m-2">
                <img src={ServiceMasterLogo} alt="ServiceMaster Logo" />
                <img src={plus} className="px-3" alt="plus" />
                <img src={StrapiLogo} width="40px" alt="Strapi Logo" />
            </Link>

            {/* <div className="flex text-gray-700 px-4 py-2 m-2 ml-auto"> */}
            {/* <Link
                    to="/login"
                    className="inline-flex items-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                >
                    Sign In
                </Link> */}
            <NavButton />
            {/* <AuthButton /> */}
            {/* </div> */}
        </Header>
    );
};
