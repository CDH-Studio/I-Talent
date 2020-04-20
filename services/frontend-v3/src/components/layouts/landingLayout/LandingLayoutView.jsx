import React from "react";
import AppLayout from "../appLayout/AppLayout";

const LandingLayoutView = (props) => {
  return (
    <AppLayout
      changeLanguage={props.changeLanguage}
      keycloak={props.keycloak}
      displaySideBar={false}
    >
      Hello
    </AppLayout>
  );
};

export default LandingLayoutView;
