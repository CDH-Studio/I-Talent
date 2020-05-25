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
import { NotFound, LandingPage, UnexpectedError } from "./pages";
import { Secured, Admin } from "./routes";
import store, { persistor } from "./redux";
import history from "./history";

const i18nConfigBuilder = locale => ({
  messages: locale === "fr" ? messagesFr : messagesEn,
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
  const { locale } = useSelector(state => state.settings);
  const [i18nConfig, setI18nConfig] = useState(i18nConfigBuilder("en"));

  useEffect(() => {
    setI18nConfig(i18nConfigBuilder(locale));
    moment.locale(`${locale}-ca`);
  }, [locale]);

  return (
    <IntlProvider
      locale={locale}
      messages={i18nConfig.messages}
      formats={i18nConfig.formats}
    >
      <Router history={history}>
        <Switch>
          <Route
            exact
            path="/"
            render={routeProps => {
              const { history, location, match, staticContext } = routeProps;
              return (
                <LandingPage
                  history={history}
                  location={location}
                  match={match}
                  staticContext={staticContext}
                />
              );
            }}
          />
          <Route
            path="/secured"
            render={routeProps => {
              const { history, location, match, staticContext } = routeProps;
              return (
                <Secured
                  history={history}
                  location={location}
                  match={match}
                  staticContext={staticContext}
                />
              );
            }}
          />
          <Route
            path="/admin"
            render={routeProps => {
              const { history, location, match, staticContext } = routeProps;
              return (
                <Admin
                  history={history}
                  location={location}
                  match={match}
                  staticContext={staticContext}
                />
              );
            }}
          />
          <Route
            path="/error"
            render={routeProps => {
              const { history, location, match, staticContext } = routeProps;
              return (
                <UnexpectedError
                  history={history}
                  location={location}
                  match={match}
                  staticContext={staticContext}
                />
              );
            }}
          />
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
