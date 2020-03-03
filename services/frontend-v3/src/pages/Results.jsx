import React from "react";
import { Row, Button, Menu, Icon } from "antd";
import AppLayout from "../components/layouts/appLayout/AppLayout";

class Results extends React.Component {
  goto = link => this.props.history.push(link);

  constructor(props) {
    super(props);

    document.title = "Results | UpSkill";
  }

  render() {
    const sideBarContent = (
      <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">
          <Icon type="user" />
          <span>nav 1s</span>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="video-camera" />
          <span>nav 2s</span>
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="upload" />
          <span>nav 3</span>
        </Menu.Item>
      </Menu>
    );
    return (
      <AppLayout
        changeLanguage={this.props.changeLanguage}
        keycloak={this.props.keycloak}
        history={this.props.history}
        displaySideBar={true}
        sideBarContent={sideBarContent}
      ></AppLayout>
    );
  }
}

//Needed when using this,props.intl
export default Results;
