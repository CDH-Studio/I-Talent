import React, { Component } from "react";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import LandingLayoutView from "./landingLayoutView";

/** Logic for the landing route layout */
function LandingLayout(props) {
  return (
    <LandingLayoutView
      changeLanguage={props.changeLanguage}
      keycloak={props.keycloak}
      history={props.history}
    />
  );
}
export default injectIntl(LandingLayout);
