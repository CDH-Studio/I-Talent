import React from "react";

import ChangeLanguageView from "./ChangeLanguageView";

function ChangeLanguage(props) {
  return <ChangeLanguageView changeLanguage={props.changeLanguage} />;
}

export default ChangeLanguage;
