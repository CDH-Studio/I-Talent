import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import Keycloak from "keycloak-js";
import ResultLayout from "../components/resultsLayout/ResultLayout";

const Results = ({ changeLanguage, keycloak, history }) => {
  useEffect(() => {
    document.title = "Results | I-Talent";
  }, []);

  return (
    <ResultLayout
      changeLanguage={changeLanguage}
      keycloak={keycloak}
      history={history}
      displaySideBar
    />
  );
};

// TODO: Remove keycloak once ResultLayout is cleaned up
Results.propTypes = {
  keycloak: PropTypes.instanceOf(Keycloak).isRequired,
  changeLanguage: PropTypes.func.isRequired,
  history: PropTypes.isRequired,
};

export default injectIntl(Results);
