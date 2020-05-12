/* eslint-disable react/jsx-filename-extension */

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { IntlProvider } from "react-intl";
import moment from "moment";
import messagesEn from "./i18n/en_CA.json";
import messagesFr from "./i18n/fr_CA.json";
import "moment/locale/en-ca";
import "moment/locale/fr-ca";

import "./App.css";
import { NotFound, LandingPage } from "./pages";
import { Secured, Admin } from "./routes";

function App() {
  const [locale, setLocale] = useState(localStorage.getItem("lang") || "en");

  const i18nConfig = {
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
  };

  moment.locale(`${locale}-ca`);

  const changeLanguage = lang => {
    localStorage.setItem("lang", lang);
    switch (locale) {
      case "fr":
        i18nConfig.messages = messagesFr;
        break;
      case "en":
      default:
        i18nConfig.messages = messagesEn;
        break;
    }

    moment.locale(`${lang}-ca`);

    setLocale(lang);
  };

  return (
    <IntlProvider
      locale={locale}
      messages={i18nConfig.messages}
      formats={i18nConfig.formats}
    >
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={routeProps => {
              const { history, location, match, staticContext } = routeProps;
              return (
                <LandingPage
                  changeLanguage={changeLanguage}
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
                  changeLanguage={changeLanguage}
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
                  changeLanguage={changeLanguage}
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
}
export default App;
