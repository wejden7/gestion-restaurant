import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./state/store";
import "./index.scss";
import App from "./App";
import {loginToken} from 'state/AuthSlice'
store.dispatch(loginToken())
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
     <App/>
    </Provider>
  </React.StrictMode>
);
