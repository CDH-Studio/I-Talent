import React from "react";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import LandingLayoutView from "./landingLayoutView";

/** Logic for the landing route layout */
const LandingLayout = ({ changeLanguage }) => {
  return <LandingLayoutView changeLanguage={changeLanguage} />;
};

LandingLayout.propTypes = {
  changeLanguage: PropTypes.func.isRequired,
};

export default injectIntl(LandingLayout);
