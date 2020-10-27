import React from "react";
import PropTypes from "prop-types";
import AboutLayoutView from "./AboutLayoutView";

/**
 *  LandingLayout(props)
 *
 *  this is the controller for LandingLayoutView
 */
const AboutLayout = ({ type }) => {
  return <AboutLayoutView type={type} />;
};

AboutLayout.propTypes = {
  type: PropTypes.oneOf(["about", "help", "privacy", "terms"]).isRequired,
};

export default AboutLayout;
