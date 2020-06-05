/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/extensions */

import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/browser";

import "./index.css";
import App from "./App.jsx";
import * as serviceWorker from "./serviceWorker";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.DEPLOYEMENT_ENV,
});

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
