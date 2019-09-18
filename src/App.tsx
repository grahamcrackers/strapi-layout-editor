import React from 'react';
import './App.css';
import { BasicLayout } from './components/basic-layout';

import 'react-grid-layout/css/styles.css';

const App: React.FC = () => {
    return (
        <div className="App">
            <BasicLayout></BasicLayout>
        </div>
    );
};

export default App;
