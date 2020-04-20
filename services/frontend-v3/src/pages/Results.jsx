import React from "react";
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import ResultLayout from "../components/resultsLayout/ResultLayout";
import { injectIntl } from "react-intl";
class Results extends React.Component {
  goto = (link) => this.props.history.push(link);

  constructor(props) {
    super(props);

    document.title = "Results | I-Talent";
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
