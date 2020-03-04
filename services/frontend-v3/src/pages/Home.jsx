import React from "react";
import { Row, Button, Menu, Icon } from "antd";
import SearchBar from "../components/searchBar/SearchBar";
import moment from "moment";
import ChangeLanguage from "../components/changeLanguage/ChangeLanguage";
import { FormattedMessage, injectIntl } from "react-intl";
import AppLayout from "../components/layouts/appLayout/AppLayout";

class Home extends React.Component {
  goto = link => this.props.history.push(link);

  constructor(props) {
    super(props);

    document.title = "Home | UpSkill";
  }

  render() {
    return (
      <AppLayout
        changeLanguage={this.props.changeLanguage}
        keycloak={this.props.keycloak}
        history={this.props.history}
        displaySideBar={false}
        // sideBarContent={}
      >
        <Row>
          <SearchBar history={this.props.history} />

          {/* <Button
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
          </Button> */}
        </Row>
      </AppLayout>
    );
  }
}

//Needed when using this,props.intl
export default injectIntl(Home);
