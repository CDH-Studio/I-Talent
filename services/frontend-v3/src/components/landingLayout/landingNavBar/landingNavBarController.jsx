import React from "react";
import PropTypes from "prop-types";
import LandingNavBarView from "./landingNavBarView";

/** UI for the landing route's sign in navigation bar */
const LandingNavBarController = ({ changeLanguage }) => {
  return <LandingNavBarView changeLanguage={changeLanguage} />;
};

LandingNavBarController.propTypes = {
  changeLanguage: PropTypes.func.isRequired,
};

export default LandingNavBarController;
