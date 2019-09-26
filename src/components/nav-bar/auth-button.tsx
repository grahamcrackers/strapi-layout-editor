import React from 'react';
import { withRouter } from 'react-router-dom';
import { fakeAuth } from '../../common/fake-auth';
import { getToken } from '../../services/token.service';

export const AuthButton = withRouter(({ history }) => {
    return getToken() ? (
        <button
            className="f6 link dim br1 ba ph3 pv2 mb2 dib mid-gray"
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
