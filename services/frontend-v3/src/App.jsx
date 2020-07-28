import React, { useState, useEffect } from "react";
import { Provider as ReduxProvider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { KeycloakProvider } from "@react-keycloak/web";
import { IntlProvider } from "react-intl";
import moment from "moment";
import messagesEn from "./i18n/en_CA.json";
import messagesFr from "./i18n/fr_CA.json";
import "moment/locale/en-ca";
import "moment/locale/fr-ca";
import AppLayout from "./components/layouts/appLayout/AppLayout";
import keycloak from "./auth/keycloak";
import keycloakConfig from "./utils/keycloakConfig";
import Routes from "./routes/Routes";

import "./App.css";

import store, { persistor } from "./redux";
import {
  setUserId,
  setUserAvatarColor,
  setUserEmail,
  setUserName,
  setUserInitials,
} from "./redux/slices/userSlice";

const i18nConfigBuilder = (locale) => ({
  messages: locale === "ENGLISH" ? messagesEn : messagesFr,
  formats: {
    number: {
      CAD: {
        style: "currency",
        currency: "USD",
        currencyDisplay: "symbol",
      },
    },
  },
});

const App = () => {
  const { locale } = useSelector((state) => state.settings);
  const [i18nConfig, setI18nConfig] = useState(i18nConfigBuilder("en"));

  useEffect(() => {
    setI18nConfig(i18nConfigBuilder(locale));
    moment.locale(`${locale === "ENGLISH" ? "en" : "fr"}-ca`);

    // This statement should be temporary, and be removed in the future
    if (localStorage.getItem("userId")) {
      const attributes = ["userId", "color", "email", "name", "acronym"];
      const reduxFunctions = [
        setUserId,
        setUserAvatarColor,
        setUserEmail,
        setUserName,
        setUserInitials,
      ];

      // Moves the info from localStorage to redux and clears it
      attributes.forEach((attribute, key) => {
        store.dispatch(reduxFunctions[key](localStorage.getItem(attribute)));
        localStorage.removeItem(attribute);
      });
    }
  }, [locale]);

  return (
    <IntlProvider
      locale={locale === "ENGLISH" ? "en" : "fr"}
      messages={i18nConfig.messages}
      formats={i18nConfig.formats}
    >
      <Routes />
    </IntlProvider>
  );
};

const ReduxWrappedApp = () => (
  <KeycloakProvider
    keycloak={keycloak}
    initConfig={keycloakConfig}
    LoadingComponent={() => <AppLayout loading />}
  >
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </ReduxProvider>
  </KeycloakProvider>
);

export default ReduxWrappedApp;
