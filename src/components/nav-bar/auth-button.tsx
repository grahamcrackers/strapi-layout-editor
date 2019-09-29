import React from 'react';
import { withRouter } from 'react-router-dom';
import { fakeAuth } from '../../common/fake-auth';
import { getToken } from '../../services/token.service';

export const AuthButton = withRouter(({ history }) => {
    return getToken() ? (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
                fakeAuth.signout(() => history.push('/'));
            }}
        >
            Sign out
        </button>
    ) : (
        <span>You are not logged in.</span>
    );
});
