import React from "react";
import { GlobalOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { FormattedMessage, injectIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { IntlPropType } from "../../customPropTypes";
import { setLocale } from "../../redux/slices/settingsSlice";

const ChangeLanguageView = ({ intl }) => {
  const languageCode = intl.formatMessage({ id: "lang.db.code" });
  const dispatch = useDispatch();

  const handleKeyPress = (e, lang) => {
    if (e.charCode === 32 || e.charCode === 13) {
      // Prevent the default action to stop scrolling when space is pressed
      e.preventDefault();
      dispatch(setLocale(lang));
    }
  };

  return (
    <Button
      ghost="true"
      type="default"
      tabIndex="0"
      onKeyPress={(e) => handleKeyPress(e, languageCode)}
      onClick={() => dispatch(setLocale(languageCode))}
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
  intl: IntlPropType,
};

ChangeLanguageView.defaultProps = {
  intl: undefined,
};

export default injectIntl(ChangeLanguageView);
