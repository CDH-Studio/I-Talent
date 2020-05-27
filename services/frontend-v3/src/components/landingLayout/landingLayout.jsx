import React from "react";
import { injectIntl } from "react-intl";
import LandingLayoutView from "./landingLayoutView";

/** Logic for the landing route layout */
const LandingLayout = () => {
  return <LandingLayoutView />;
};

export default injectIntl(LandingLayout);
