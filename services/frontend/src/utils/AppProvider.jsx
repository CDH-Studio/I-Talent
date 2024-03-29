import "dayjs/locale/en-ca";
import "dayjs/locale/fr-ca";

import { useEffect, useState } from "react";
import { IntlProvider } from "react-intl";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { ConfigProvider } from "antd";
import enUS from "antd/es/locale/en_US";
import frFR from "antd/es/locale/fr_FR";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import localizedFormat from "dayjs/plugin/localizedFormat";
import PropTypes from "prop-types";
import { PersistGate } from "redux-persist/integration/react";

import { initKeycloakConfig, keycloak } from "../auth/keycloak";
import messagesEn from "../i18n/en_CA.json";
import messagesFr from "../i18n/fr_CA.json";
import store, { persistor } from "../redux";
import history from "./history";

dayjs.extend(localeData);
dayjs.extend(localizedFormat);

const i18nConfigBuilder = (locale) => ({
  formats: {
    number: {
      CAD: {
        currency: "USD",
        currencyDisplay: "symbol",
        style: "currency",
      },
    },
  },
  messages: locale === "ENGLISH" ? messagesEn : messagesFr,
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
      formats={i18nConfig.formats}
      locale={locale === "ENGLISH" ? "en" : "fr"}
      messages={i18nConfig.messages}
    >
      <ConfigProvider locale={locale === "ENGLISH" ? enUS : frFR}>
        {children}
      </ConfigProvider>
    </IntlProvider>
  );
};

const AppProvider = ({ children }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <IntelProv>
        <BrowserRouter getUserConfirmation={history.getUserConfirmation}>
          <ReactKeycloakProvider
            authClient={keycloak}
            initOptions={initKeycloakConfig}
            LoadingComponent={<div />}
          >
            {children}
          </ReactKeycloakProvider>
        </BrowserRouter>
      </IntelProv>
    </PersistGate>
  </Provider>
);

IntelProv.propTypes = {
  children: PropTypes.node.isRequired,
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
