import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './view/App';
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./store";
import {Provider} from "react-redux"

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store} key='Provider'>
        <PersistGate loading={<></>} persistor={persistor} key='PersistGate'>
            <App key='App'/>
        </PersistGate>
    </Provider>
);

