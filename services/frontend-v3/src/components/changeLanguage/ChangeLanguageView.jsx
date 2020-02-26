//PREEXISTING CODE

import React, { Component } from "react";
import { Icon, Radio, Button } from "antd";
import { injectIntl } from "react-intl";

class ChangeLanguageView extends Component {
  changeLanguage = lang => {
    this.props.changeLanguage(lang);
  };

  render() {
    const { intl } = this.props;
    const languageCode = intl.formatMessage({ id: "language.code" });

    return (
      <Radio.Group defaultValue={languageCode} buttonStyle="solid">
        <Radio.Button value="en" onClick={() => this.changeLanguage("en")}>
          EN
        </Radio.Button>
        <Radio.Button value="fr" onClick={() => this.changeLanguage("fr")}>
          FR
        </Radio.Button>
      </Radio.Group>
    );
  }
}
export default injectIntl(ChangeLanguageView);
