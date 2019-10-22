import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { Page } from '../../common/ui/page';
import { LoginForm } from '../login-form/login-form';
import { useAuthentication } from '../../common/hooks/useAuthentication';

interface LoginPageState {
    username: string;
    password: string;
    redirectToReferrer: boolean;
}

export const LoginPage = () => {
    const location = useLocation();
    const { redirectToReferrer } = useAuthentication();
    console.log(location);
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
