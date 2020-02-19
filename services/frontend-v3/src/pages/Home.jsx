import React from "react";
import { Row } from "antd";
import Layout from "../components/layout/Layout";
import { Button } from "antd";
import moment from "moment";
import ChangeLanguage from "../components/changeLanguage/ChangeLanguage";
import { FormattedMessage, injectIntl } from "react-intl";

class Home extends React.Component {
  goto = link => this.props.history.push(link);

  render() {
    return (
      <Layout>
        <h1>Hi, {localStorage.getItem("name")}</h1>
        <FormattedMessage id="landing.benefit.find.people" />
        <Row>
          <Button
            type="danger"
            onClick={() => {
              this.goto("/");
              this.props.keycloak.logout();
            }}
          >
            {this.props.intl.formatMessage({
              id: "sign.out",
              defaultMessage: "Logout"
            })}
          </Button>
        </Row>
        <Row>{moment().format("LL")}</Row>
        <ChangeLanguage changeLanguage={this.props.changeLanguage} />
      </Layout>
    );
  }
}

//Needed when using this,props.intl
export default injectIntl(Home);
