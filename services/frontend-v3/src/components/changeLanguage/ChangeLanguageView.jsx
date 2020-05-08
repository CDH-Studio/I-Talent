// PREEXISTING CODE

import React from "react";
import { GlobalOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { FormattedMessage, injectIntl } from "react-intl";

function ChangeLanguageView(props) {
  const { intl } = props;
  const languageCode = intl.formatMessage({ id: "lang.code" });

  const changeLanguage = (lang) => {
    props.changeLanguage(lang);
  };

  const handleKeyPress = (e, lang) => {
    if (e.charCode === 32 || e.charCode === 13) {
      // Prevent the default action to stop scrolling when space is pressed
      e.preventDefault();
      changeLanguage(lang);
    }
  };

  return (
    <Button
      ghost="true"
      type="default"
      tabIndex="0"
      onKeyPress={(e) => handleKeyPress(e, languageCode)}
      onClick={() => changeLanguage(languageCode)}
      style={{ textTransform: "uppercase" }}
    >
      <GlobalOutlined />{" "}
      <FormattedMessage
        style={{ textTransform: "capitalize" }}
        id="lang.code"
      />
    </Button>
  );
}

export default injectIntl(ChangeLanguageView);
