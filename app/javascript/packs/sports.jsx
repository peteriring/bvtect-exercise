import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router";
import { createBrowserHistory } from "history";
import App from "components/App";
import { store } from "../state/store";

const history = createBrowserHistory();

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>,
    document.body.appendChild(document.createElement("div"))
  );
});