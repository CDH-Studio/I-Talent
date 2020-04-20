import React from "react";
import LandingLayoutView from "./LandingLayoutView";

/*
 *  LandingLayout(props)
 *
 *  this is the controller for LandingLayoutView
 */
const LandingLayout = (props) => {
  return <LandingLayoutView changeLanguage={props.changeLanguage} />;
};

export default LandingLayout;
