import React from "react";
import LandingLayout from "../components/layouts/landingLayout/LandingLayout";

/** UI for the landing route layout */
function LandingPage(props) {
  return <LandingLayout changeLanguage={props.changeLanguage} />;
}

export default LandingPage;
