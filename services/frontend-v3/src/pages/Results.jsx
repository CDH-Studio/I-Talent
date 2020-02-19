import React from "react";

import SiderLayout from "../components/layout/SiderLayout";

import { injectIntl } from "react-intl";

class Results extends React.Component {
  goto = link => this.props.history.push(link);

  constructor(props) {
    super(props);

    document.title = "Results | UpSkill";
  }

  render() {
    return <SiderLayout>TEST!!!</SiderLayout>;
  }
}

//Needed when using this,props.intl
export default injectIntl(Results);
