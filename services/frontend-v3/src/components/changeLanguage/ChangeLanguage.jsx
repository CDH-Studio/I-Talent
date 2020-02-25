import React from "react";
import {} from "antd";

import ChangeLanguageView from "./ChangeLanguageView";

export default class SideNav extends React.Component {
  render() {
    return (
      <ChangeLanguageView
        changeLanguage={this.props.changeLanguage}
      ></ChangeLanguageView>
    );
  }
}
