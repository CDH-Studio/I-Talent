import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { IntlProvider } from "react-intl";

import { Secured, Admin } from "./components/routes";

import messages_en from "./i18n/en_CA.json";
import messages_fr from "./i18n/fr_CA.json";
import "./App.css";

import { Landing } from "./pages";

import moment from "moment";
import "moment/min/moment-with-locales";
import "moment/locale/en-ca";
import "moment/locale/fr-ca";

let localLang = (() => {
  if (localStorage.getItem("lang")) {
    return localStorage.getItem("lang");
  }
  localStorage.setItem("lang", "en");
  return localStorage.getItem("lang");
})();

let i18nConfig = {
  locale: localLang,
  messages: messages_en,
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

class App extends Component {
  constructor(props) {
    super(props);

    let language = localStorage.getItem("lang") || "en";
    i18nConfig.messages = language === "fr" ? messages_fr : messages_en;
    moment.locale(language + "-ca");

    this.state = {
      locale: language,
    };

    this.changeLanguage = this.changeLanguage.bind(this);
  }

  render() {
    //If NOT using some version of Internet Explorer
    if (!/MSIE|Trident/.test(window.navigator.userAgent)) {
      document.body.style = "background-color: #eeeeee";
    }

    return (
      <IntlProvider
        locale={i18nConfig.locale}
        messages={i18nConfig.messages}
        formats={i18nConfig.formats}
      >
        <Router>
          {this.state.redirect}
          <div>
            <Route
              exact
              path="/"
              render={(routeProps) => (
                <Landing changeLanguage={this.changeLanguage} {...routeProps} />
              )}
            />
            <Route
              path="/secured"
              render={(routeProps) => (
                <Secured changeLanguage={this.changeLanguage} {...routeProps} />
              )}
            />
            <Route
              path="/admin"
              render={(routeProps) => (
                <Admin changeLanguage={this.changeLanguage} {...routeProps} />
              )}
            />
          </div>
        </Router>
      </IntlProvider>
    );
  }

  changeLanguage(lang) {
    localStorage.setItem("lang", lang);
    switch (lang) {
      case "fr":
        i18nConfig.messages = messages_fr;
        break;
      case "en":
        i18nConfig.messages = messages_en;
        break;
      default:
        i18nConfig.messages = messages_en;
        break;
    }

    moment.locale(lang + "-ca");

    i18nConfig.locale = localStorage.getItem("lang") || "en";
    this.setState({ locale: localStorage.getItem("lang") || "en" });
  }
}

export default App;
