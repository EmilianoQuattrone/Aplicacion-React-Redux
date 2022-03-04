import React from "react";
import ReactDOM from "react-dom";

import { Provider } from 'react-redux';
import { store } from './store/store';
import { JournalApp } from "./JournalApp";

import "./styles/styles.scss";

ReactDOM.render(

    <Provider store={store}>
        <JournalApp />
    </Provider>,
    document.getElementById("root")
);