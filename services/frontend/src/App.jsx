import React from "react";
import { hot } from "react-hot-loader";
import Routes from "./routes/Routes";
import AppProvider from "./utils/AppProvider";

import "./styling/accessibility.scss";
import "./styling/custom_antd.scss";
import "./styling/index.scss";

const App = () => (
  <AppProvider>
    <Routes />
  </AppProvider>
);

export default hot(module)(App);
