import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { SSRKeycloakProvider, ClientPersistors } from "@react-keycloak/razzle";
import App from "./App";
import AppProvider from "./utils/AppProvider";
import historySingleton from "./utils/history";
import { keycloakConfig, initKeycloakConfig } from "./auth/keycloak";
import AppLayout from "./components/layouts/appLayout/AppLayout";

hydrate(
  <SSRKeycloakProvider
    keycloakConfig={keycloakConfig}
    initConfig={initKeycloakConfig}
    persistor={ClientPersistors.Cookies}
    LoadingComponent={() => <AppLayout loading />}
  >
    <AppProvider>
      <BrowserRouter history={historySingleton}>
        <App />
      </BrowserRouter>
    </AppProvider>
  </SSRKeycloakProvider>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}
