import React from "react";
import Routes from "./routes/Routes";
import AppProvider from "./utils/AppProvider";

import "./styling/index.scss";
import "./styling/accessibility.scss";
import "./styling/custom_antd.scss";

const App = () => (
  <AppProvider>
    <Routes />
  </AppProvider>
);

export default App;
