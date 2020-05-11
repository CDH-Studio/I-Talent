import React from "react";
import PropTypes from "prop-types";
import LandingLayoutView from "./LandingLayoutView";

/**
 *  LandingLayout(props)
 *
 *  this is the controller for LandingLayoutView
 */
const LandingLayout = ({ changeLanguage }) => {
  return <LandingLayoutView changeLanguage={changeLanguage} />;
};

LandingLayout.propTypes = {
  changeLanguage: PropTypes.func.isRequired,
};

export default LandingLayout;
