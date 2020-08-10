import React from "react";
import Routes from "./routes/Routes";
import AppProvider from "./utils/AppProvider";
import "./App.css";

const App = () => (
  <AppProvider>
    <Routes />
  </AppProvider>
);

export default App;
