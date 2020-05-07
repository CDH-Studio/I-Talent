import React from "react";
import AppLayoutView from "./AppLayoutView";

function AppLayout(props) {
  return (
    <AppLayoutView
      changeLanguage={props.changeLanguage}
      keycloak={props.keycloak}
      history={props.history}
      displaySideBar={props.displaySideBar}
      sideBarContent={props.sideBarContent}
    >
      {props.children}
    </AppLayoutView>
  );
}

export default AppLayout;
