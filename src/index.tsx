/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AuthDataProvider } from './common/hooks/useAuthentication';

import './styles/index.css';
import './styles/react-grid-layout.css';
render(
    <AuthDataProvider>
        <App />
    </AuthDataProvider>,
    document.getElementById('root'),
);

// Enable Hot Module Reloading
if ((module as any).hot) {
    (module as any).hot.accept('./App', () => {
        const NewApp = require('./App').default;
        render(
            <AuthDataProvider>
                <NewApp />
            </AuthDataProvider>,
            document.getElementById('root'),
        );
    });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
