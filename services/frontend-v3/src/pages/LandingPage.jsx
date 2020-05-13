import React from "react";
import PropTypes from "prop-types";
import LandingLayout from "../components/layouts/landingLayout/LandingLayout";

/** UI for the landing route layout */
const LandingPage = ({ changeLanguage }) => {
  return <LandingLayout changeLanguage={changeLanguage} />;
};

LandingPage.propTypes = {
  changeLanguage: PropTypes.func.isRequired,
};

export default LandingPage;
