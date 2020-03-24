import React, { Component } from "react";
import OfficialLanguageView from "./OfficialLanguageView";

class OfficialLanguage extends Component {
  render() {
    const { data } = this.props;

    return (
      <OfficialLanguageView data={data} locale={localStorage.getItem("lang")} />
    );
  }
}

export default OfficialLanguage;
