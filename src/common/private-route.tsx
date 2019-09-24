import React from 'react';
import { Redirect, Route } from 'react-router-dom';
// import { fakeAuth } from './fake-auth';
import { getToken } from '../services/token.service';

export function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                getToken() ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
}
