import React, { useState, useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Provider as ReduxProvider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { IntlProvider } from "react-intl";
import moment from "moment";
import messagesEn from "./i18n/en_CA.json";
import messagesFr from "./i18n/fr_CA.json";
import "moment/locale/en-ca";
import "moment/locale/fr-ca";

import "./App.css";
import {
  NotFound,
  LandingPage,
  UnexpectedError,
  Forbidden,
  About,
} from "./pages";
import { Secured, Admin } from "./routes";
import store, { persistor } from "./redux";
import historySingleton from "./history";
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
      <Router history={historySingleton}>
        <Switch>
          <Route exact path="/" render={() => <LandingPage />} />
          <Route
            path="/secured"
            render={({ location }) => <Secured location={location} />}
          />
          <Route path="/about" render={({ type }) => <About type="about" />} />
          <Route path="/help" render={({ type }) => <About type="help" />} />
          <Route path="/terms" render={({ type }) => <About type="terms" />} />
          <Route
            path="/privacy"
            render={({ type }) => <About type="privacy" />}
          />
          <Route path="/admin" render={() => <Admin />} />
          <Route path="/error" render={() => <UnexpectedError />} />
          <Route path="/forbidden" render={() => <Forbidden />} />
          <Route render={() => <NotFound />} />
        </Switch>
      </Router>
    </IntlProvider>
  );
};

const ReduxWrappedApp = () => (
  <ReduxProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </ReduxProvider>
);

export default ReduxWrappedApp;
