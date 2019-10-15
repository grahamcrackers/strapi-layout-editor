import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { PrivateRoute } from './common/private-route';
import { Dashboard } from './components/dashboard';
import { LoginPage } from './pages/login.page';
import { NavBar } from './components/nav-bar';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

// optional cofiguration
const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE,
};

const App: React.FC = () => {
    return (
        <AlertProvider template={AlertTemplate} {...options}>
            <Router>
                <NavBar />
                <main className="h-full pt-16">
                    <Route exact path="/" component={() => <Redirect to="/dashboard" />} />
                    <Route path="/login" component={LoginPage} />
                    <PrivateRoute path="/dashboard" component={Dashboard} />
                </main>
            </Router>
        </AlertProvider>
    );
};

export default App;
