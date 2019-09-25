import React from 'react';
import { render } from 'react-dom';
import App from './App';
import * as serviceWorker from './common/serviceWorker';

// styles
import 'tachyons/css/tachyons.css';
import './styles/index.css';

console.log(process.env.REACT_APP_STRAPI_ENDPOINT);

render(<App />, document.getElementById('root'));

// Enable Hot Module Reloading
if ((module as any).hot) {
    (module as any).hot.accept('./App', () => {
        const NewApp = require('./App').default;
        render(<NewApp />, document.getElementById('root'));
    });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
