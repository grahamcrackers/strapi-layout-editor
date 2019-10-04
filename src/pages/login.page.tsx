import React, { Component } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { login } from '../services/login.service';
import { fakeAuth } from '../common/fake-auth';
import { RouteComponentProps } from 'react-router';
import { Page } from '../ui/page';
import { LoginForm } from '../components/login-form/login-form';
import { useAuthentication } from '../common/hooks/useAuthentication';

interface LoginPageState {
    username: string;
    password: string;
    redirectToReferrer: boolean;
}
// const handleSubmit = async event => {
// event.preventDefault();
// fakeAuth.authenticate(async () => {
//     await login(this.state.username, this.state.password);
//     this.setState({ redirectToReferrer: true });
// });
// };

export const LoginPage = () => {
    const location = useLocation();
    const { redirectToReferrer } = useAuthentication();
    const { from } = location.state || { from: { pathname: '/dashboard' } };

    if (redirectToReferrer) return <Redirect to={from} />;

    return (
        <Page className="flex bg-indigo-200 h-full justify-center items-center">
            <div className="w-full max-w-xs">
                <LoginForm />
            </div>
        </Page>
    );
};
