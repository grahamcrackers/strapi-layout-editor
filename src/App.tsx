import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { PrivateRoute } from './common/private-route';
import { Dashboard } from './components/dashboard';
import { NavBar } from './components/nav-bar';
import { LoginPage } from './pages/login.page';
import { Protected } from './pages/protected.page';
import { Public } from './pages/public.page';
import { BasicLayout } from './components/grid-layout';

import stamp from './assets/img/stamp.svm.svg';

const App: React.FC = () => {
    return (
        <Router>
            <div className="max-w-sm mx-auto flex p-6 bg-white rounded-lg shadow-xl">
                <div className="flex-shrink-0">
                    <img className="h-12 w-12" src={stamp} alt="ChitChat Logo" />
                </div>
                <div className="ml-6 pt-1">
                    <h4 className="text-xl text-gray-900 leading-tight">ChitChat</h4>
                    <p className="text-base text-gray-600 leading-normal">You have a new message!</p>
                </div>
            </div>

            <NavBar />
            <Route path="/public" component={Public} />
            <Route path="/login" component={LoginPage} />

            <PrivateRoute path="/protected" component={Protected} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/basic-layout" component={BasicLayout} />
        </Router>
    );
};

export default App;
