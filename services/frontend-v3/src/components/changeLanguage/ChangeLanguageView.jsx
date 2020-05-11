import React from "react";
import { GlobalOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { FormattedMessage, injectIntl } from "react-intl";
import PropTypes from "prop-types";

const ChangeLanguageView = ({ intl, changeLanguage }) => {
  const languageCode = intl.formatMessage({ id: "lang.code" });

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
};

ChangeLanguageView.propTypes = {
  changeLanguage: PropTypes.func.isRequired,
  intl: PropTypes.isRequired,
};

export default injectIntl(ChangeLanguageView);
