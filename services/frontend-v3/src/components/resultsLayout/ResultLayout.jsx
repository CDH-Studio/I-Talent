import React from "react";
import {} from "antd";
import ResultLayoutView from "./ResultLayoutView";

function ResultLayout(props) {
  return (
    <ResultLayoutView
      changeLanguage={props.changeLanguage}
      keycloak={props.keycloak}
      history={props.history}
    >
      {props.children}
    </ResultLayoutView>
  );
}

export default ResultLayout;
