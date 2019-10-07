import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { PrivateRoute } from './common/private-route';
import { Dashboard } from './components/dashboard';
import { LoginPage } from './pages/login.page';
import { NavBar } from './components/nav-bar';
import { Redirect } from 'react-router';

const App: React.FC = () => {
    console.log('<App />');
    return (
        <Router>
            <NavBar />
            <main className="h-full pt-16">
                <Route path="/login" component={LoginPage} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <Redirect exact from="/" to="dashboard" />
            </main>
            {/* TODO: Alerts */}
        </Router>
    );
};

export default App;
