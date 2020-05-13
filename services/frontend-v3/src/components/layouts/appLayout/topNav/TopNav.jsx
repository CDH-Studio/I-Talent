import React from "react";
import PropTypes from "prop-types";
import TopNavView from "./TopNavView";

const TopNav = ({ changeLanguage }) => {
  return <TopNavView changeLanguage={changeLanguage} />;
};

TopNav.propTypes = {
  changeLanguage: PropTypes.func.isRequired,
};

export default TopNav;
