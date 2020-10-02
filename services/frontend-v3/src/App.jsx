import React from "react";
import Routes from "./routes/Routes";
import "./App.scss";
import "./index.css";
import "antd/dist/antd.less";
import AppProvider from "./utils/AppProvider";

const App = () => (
  <AppProvider>
    <Routes />
  </AppProvider>
);

export default App;
