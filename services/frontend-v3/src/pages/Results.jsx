import React from "react";
import { Row } from "antd";
import Layout from "../components/layout/Layout";
import { Button } from "antd";
import moment from "moment";
import ChangeLanguage from "../components/changeLanguage/ChangeLanguage";
import { FormattedMessage, injectIntl } from "react-intl";

class Home extends React.Component {
  goto = link => this.props.history.push(link);

  constructor(props) {
    super(props);

    document.title = "Home | UpSkill";
  }

  render() {
    return <Layout>TEST!!!</Layout>;
  }
}

//Needed when using this,props.intl
export default injectIntl(Home);
