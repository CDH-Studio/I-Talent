import React from "react";
import PropTypes from "prop-types";
import ChangeLanguageView from "./ChangeLanguageView";

const ChangeLanguage = ({ changeLanguage }) => {
  return <ChangeLanguageView changeLanguage={changeLanguage} />;
};

ChangeLanguage.propTypes = {
  changeLanguage: PropTypes.func.isRequired,
};

export default ChangeLanguage;
