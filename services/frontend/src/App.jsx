import React from "react";
import Routes from "./routes/Routes";
import AppProvider from "./utils/AppProvider";

import "./styling/accessibility.less";
import "./styling/custom_antd.less";
import "./styling/index.less";

const App = () => (
  <AppProvider>
    <Routes />
  </AppProvider>
);

export default App;
