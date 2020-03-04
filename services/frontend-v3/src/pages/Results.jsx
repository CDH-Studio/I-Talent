import React from "react";
import { Form, Row, Button, Menu, Icon } from "antd";
import ResultsCard from "../components/resultsCard/ResultsCard";
import ResultLayout from "../components/resultsLayout/ResultLayout";
import { injectIntl } from "react-intl";
class Results extends React.Component {
  goto = link => this.props.history.push(link);

  constructor(props) {
    super(props);

    document.title = "Results | UpSkill";
  }

  render() {
    return (
      <ResultLayout
        changeLanguage={this.props.changeLanguage}
        keycloak={this.props.keycloak}
        history={this.props.history}
        displaySideBar={true}
        //sideBarContent={this.props.sideBarContent}
      ></ResultLayout>
    );
  }
}

//Needed when using this,props.intl
Results = Form.create({})(Results);
export default injectIntl(Results);
