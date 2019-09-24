import React from 'react';
import { withRouter } from 'react-router-dom';
import { fakeAuth } from './fake-auth';
import { getToken } from '../services/token.service';

export const AuthButton = withRouter(({ history }) =>
    getToken() ? (
        <p>
            Welcome!{' '}
            <button
                onClick={() => {
                    fakeAuth.signout(() => history.push('/'));
                }}
            >
                Sign out
            </button>
        </p>
    ) : (
        <p>You are not logged in.</p>
    ),
);
