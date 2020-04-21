import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { IntlProvider } from "react-intl";
import messages_en from "./i18n/en_CA.json";
import messages_fr from "./i18n/fr_CA.json";
import moment from "moment";
import "moment/locale/en-ca";
import "moment/locale/fr-ca";

import "./App.css";
import { NotFound, LandingPage } from "./pages";
import { Secured, Admin } from "./routes";

function App() {
  const [locale, setLocale] = useState(localStorage.getItem("lang") || "en");

  const i18nConfig = {
    messages: locale === "fr" ? messages_fr : messages_en,
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

  moment.locale(locale + "-ca");

  const changeLanguage = (lang) => {
    localStorage.setItem("lang", lang);
    switch (locale) {
      case "fr":
        i18nConfig.messages = messages_fr;
        break;
      case "en":
      default:
        i18nConfig.messages = messages_en;
        break;
    }

    moment.locale(lang + "-ca");

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
            render={(routeProps) => (
              <LandingPage changeLanguage={changeLanguage} {...routeProps} />
            )}
          />
          <Route
            path="/secured"
            render={(routeProps) => (
              <Secured changeLanguage={changeLanguage} {...routeProps} />
            )}
          />
          <Route
            path="/admin"
            render={(routeProps) => (
              <Admin changeLanguage={changeLanguage} {...routeProps} />
            )}
          />
          <Route render={() => <NotFound />} />
        </Switch>
      </Router>
    </IntlProvider>
  );
}
export default App;
