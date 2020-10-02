import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { IntlProvider } from "react-intl";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import localeData from "dayjs/plugin/localeData";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { KeycloakProvider } from "@react-keycloak/web";

import store, { persistor } from "../redux";
import messagesEn from "../i18n/en_CA.json";
import messagesFr from "../i18n/fr_CA.json";
import "dayjs/locale/en-ca";
import "dayjs/locale/fr-ca";
import AppLayout from "../components/layouts/appLayout/AppLayout";
import { keycloak, initKeycloakConfig } from "../auth/keycloak";

dayjs.extend(localeData);
dayjs.extend(localizedFormat);

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

const IntelProv = ({ children }) => {
  const { locale } = useSelector((state) => state.settings);
  const [i18nConfig, setI18nConfig] = useState(i18nConfigBuilder("en"));

  useEffect(() => {
    setI18nConfig(i18nConfigBuilder(locale));
    dayjs.locale(`${locale === "ENGLISH" ? "en" : "fr"}-ca`);
  }, [locale]);

  return (
    <IntlProvider
      locale={locale === "ENGLISH" ? "en" : "fr"}
      messages={i18nConfig.messages}
      formats={i18nConfig.formats}
    >
      {children}
    </IntlProvider>
  );
};

const AppProvider = ({ children }) => (
  <KeycloakProvider
    keycloak={keycloak}
    initConfig={initKeycloakConfig}
    LoadingComponent={() => <AppLayout loading />}
  >
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <IntelProv>{children}</IntelProv>
      </PersistGate>
    </Provider>
  </KeycloakProvider>
);

IntelProv.propTypes = {
  children: PropTypes.node.isRequired,
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
