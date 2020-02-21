//PREEXISTING CODE

import React, { Component } from "react";
import { Icon, Button } from "antd";
import { FormattedMessage, injectIntl } from "react-intl";

class ChangeLanguage extends Component {
  changeLanguage = lang => {
    this.props.changeLanguage(lang);
  };

  handleKeyPress = (e, lang) => {
    if (e.charCode === 32 || e.charCode === 13) {
      // Prevent the default action to stop scrolling when space is pressed
      e.preventDefault();
      this.changeLanguage(lang);
    }
  };

  render() {
    const { intl } = this.props;
    const languageCode = intl.formatMessage({ id: "lang.code" });

    return (
      <Button
        type="default"
        tabIndex="0"
        onKeyPress={e => this.handleKeyPress(e, languageCode)}
        onClick={() => this.changeLanguage(languageCode)}
        style={{ textTransform: "uppercase" }}
      >
        <Icon type="global" />{" "}
        <FormattedMessage
          style={{ textTransform: "capitalize" }}
          id="lang.code"
        />
      </Button>
    );
  }
}
export default injectIntl(ChangeLanguage);
