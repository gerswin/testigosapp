import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import Amplify, { Auth } from "aws-amplify";
import awsmobile from "./aws-exports";
import { Provider } from 'react-redux';
import store from './redux/store';

Amplify.configure(awsmobile);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);
