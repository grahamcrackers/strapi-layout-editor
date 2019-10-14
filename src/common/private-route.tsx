import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuthentication } from './hooks/useAuthentication';

export function PrivateRoute({ component: Component, ...rest }) {
    const { isAuthenticated } = useAuthentication();

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
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
