import React, { FC } from 'react';
import { NavLink, Link } from 'react-router-dom';
import ServiceMasterLogo from '../../assets/img/stamp.svm.svg';
import { AuthButton } from './auth-button';

export const NavBar: FC<{}> = () => {
    return (
        <nav className="dt w-100 border-box pa3 ph5-ns">
            <Link className="dtc v-mid mid-gray link dim w-25" to="/dashboard" title="Home">
                {/* <img src="http://tachyons.io/img/logo.jpg" className="dib w2 h2 br-100" alt="Site Name" /> */}
                <img src={ServiceMasterLogo} alt="ServiceMaster Logo" />
            </Link>
            <div className="dtc v-mid w-75 tr">
                <NavLink className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns" to="/public" title="Public">
                    PublicPage
                </NavLink>
                <NavLink className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns" to="/private" title="Private">
                    PrivatePage
                </NavLink>
                <NavLink className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns" to="/basic-layout" title="Basic Layout">
                    BasicLayout
                </NavLink>
                {/* <NavLink className="link dim dark-gray f6 f5-ns dib" to="/" title="SignInOut">
                    Sign In/Out
                </NavLink> */}
                <AuthButton />
            </div>
        </nav>
    );
};

// <nav className="pa3 pa4-ns">
//     <a className="link dim black b f6 f5-ns dib mr3" href="#" title="Home">
//         Site Name
//     </a>
//     <NavLink to="/public">Public Page</NavLink>
//     <NavLink to="/protected">Protected Page</NavLink>
//     <NavLink to="/dashboard">Dashboard</NavLink>

//     <NavButton></NavButton>
// </nav>
