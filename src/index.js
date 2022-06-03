import React from "react";
import { createRoot } from 'react-dom/client';

import 'antd/dist/antd.min.css';
import "./assets/css/antd.less";
import "./assets/css/main.scss";

import App from "./App";

import { store } from './stores/store'
import { Provider } from 'react-redux'

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
)
