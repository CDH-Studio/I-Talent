import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { IntlProvider } from "react-intl";
import messages_en from "./i18n/en_CA.json";
import messages_fr from "./i18n/fr_CA.json";
import moment from "moment";
import "moment/locale/en-ca";
import "moment/locale/fr-ca";

import "./App.css";
import { Landing, NotFound } from "./pages";
import { Secured } from "./routes";

class App extends Component {
  goto = link => this.props.history.push(link);

  constructor(props) {
    super(props);

    let language = localStorage.getItem("lang");
    i18nConfig.messages = language === "fr" ? messages_fr : messages_en;
    moment.locale(language + "-ca");

    this.state = {
      locale: language
    };

    this.changeLanguage = this.changeLanguage.bind(this);
  }
  render() {
    return (
      <IntlProvider
        locale={i18nConfig.locale}
        messages={i18nConfig.messages}
        formats={i18nConfig.formats}
      >
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={routeProps => (
                <Landing changeLanguage={this.changeLanguage} {...routeProps} />
              )}
            />
            <Route
              path="/secured"
              render={routeProps => (
                <Secured changeLanguage={this.changeLanguage} {...routeProps} />
              )}
            />
            <Route render={() => <NotFound />} />
          </Switch>
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

    i18nConfig.locale = localStorage.getItem("lang");
    this.setState({ locale: localStorage.getItem("lang") });
  }
}

let localLang = (() => {
  const currLang = localStorage.getItem("lang");
  if (currLang) {
    return currLang;
  }
  localStorage.setItem("lang", "en");
  return "en";
})();

let i18nConfig = {
  locale: localLang,
  messages: messages_en,
  formats: {
    number: {
      CAD: {
        style: "currency",
        currency: "USD",
        currencyDisplay: "symbol"
      }
    }
  }
};

export default App;
