import React from "react";
import {} from "antd";

import TopNavView from "./TopNavView";

function TopNav(props) {
  return (
    <TopNavView
      changeLanguage={props.changeLanguage}
      keycloak={props.keycloak}
    />
  );
}

export default TopNav;
