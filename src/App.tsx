import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { PrivateRoute } from './common/private-route';
import { Dashboard } from './components/dashboard';
import { LoginPage } from './pages/login.page';
import { Protected } from './pages/protected.page';
import { Public } from './pages/public.page';

import ServiceMasterLogo from 'assets/img/stamp.svm.svg';
import plus from 'assets/icons/plus.svg';
import StrapiLogo from 'assets/img/logo.strapi.svg';

const App: React.FC = () => {
    return (
        <Router>
            {/* flex flex-row bg-white border-b border-gray-400 fixed top-0 inset-x-0 z-100 h-16 items-center */}
            <header className="fixed flex flex-row h-16 w-full shadow">
                <Link to="/dashboard" className="flex flex-row text-center px-4 py-2 m-2">
                    <img src={ServiceMasterLogo} alt="ServiceMaster Logo" />
                    <img src={plus} className="px-3" alt="plus" />
                    <img src={StrapiLogo} width="40px" alt="Strapi Logo" />
                </Link>
                {/* <div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">2</div> */}
                <div className="flex text-gray-700 text-center px-4 py-2 m-2 ml-auto">
                    <Link
                        to="/login"
                        className="inline-flex items-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    >
                        Sign In
                    </Link>
                </div>
            </header>
            <main className="h-full pt-16">
                <Route path="/public" component={Public} />
                <Route path="/login" component={LoginPage} />

                <PrivateRoute path="/protected" component={Protected} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
            </main>
            <aside id="alert-container" className="fixed top-0 right-0 w-1/2 m-4 mt-20 bg-grey-400 z-1000">
                {/* <Alert /> */}
                {/* <ChatAlert /> */}
            </aside>
        </Router>
    );
};

export default App;
