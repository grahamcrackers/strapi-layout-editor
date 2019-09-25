import React from 'react';
import 'react-grid-layout/css/styles.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { AuthButton } from './common/auth-button';
import { PrivateRoute } from './common/private-route';
import { Dashboard } from './components/dashboard';
import { LoginPage } from './pages/login.page';
import { Protected } from './pages/protected.page';
import { Public } from './pages/public.page';

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <AuthButton />
                <ul>
                    <li>
                        <Link to="/public">Public Page</Link>
                    </li>
                    <li>
                        <Link to="/protected">Protected Page</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                </ul>
                <Route path="/public" component={Public} />
                <Route path="/login" component={LoginPage} />
                <PrivateRoute path="/protected" component={Protected} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                {/* <PrivateRoute path="/dashboard" component={Dashboard} /> */}
            </div>
        </Router>
    );
};

export default App;
