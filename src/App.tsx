import React from 'react';
import 'react-grid-layout/css/styles.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { PrivateRoute } from './common/private-route';
import { Dashboard } from './components/dashboard';
import { NavBar } from './components/nav-bar';
import { LoginPage } from './pages/login.page';
import { Protected } from './pages/protected.page';
import { Public } from './pages/public.page';
import { BasicLayout } from './components/grid-layout';

const App: React.FC = () => {
    return (
        <Router>
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
