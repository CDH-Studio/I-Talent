import React, { Component } from "react";
import { Layout, Dropdown, Menu, Icon } from "antd";
import ChangeLanguage from "../changeLanguage/ChangeLanguage";
import CustomAvatar from "../customAvatar/CustomAvatar";
import Logo from "../sideNav/logo_v2.svg";
import { FormattedMessage } from "react-intl";

const { Header } = Layout;

export default class TopNavView extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    // menu options for profile dropdown
    const menu = (
      <Menu style={styles.dropDownMenu}>
        <Menu.Item style={styles.dropDownItem}>
          <a rel="noopener noreferrer" href="/secured/profile/">
            <Icon type="user" style={styles.MenuIcon} />
            <FormattedMessage id="my.profile" />
          </a>
        </Menu.Item>
        <Menu.Item style={styles.dropDownItem}>
          <a rel="noopener noreferrer" href="/secured/profile/edit">
            <Icon type="edit" style={styles.MenuIcon} />
            <FormattedMessage id="edit.profile" />
          </a>
        </Menu.Item>
        <Menu.Item style={styles.dropDownItem}>
          <a rel="noopener noreferrer" href="/">
            <Icon type="logout" style={styles.MenuIcon} />
            <FormattedMessage id="sign.out" />
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <Header style={styles.header}>
        {/* Render logo */}
        <img src={Logo} alt="Logo" style={styles.navBrand} />
        {/* Render right sigh of top menu */}
        <div style={styles.rightMenu}>
          {/* Render User Profile Dropdown */}
          <Dropdown overlay={menu} placement="bottomCenter">
            <a
              className="ant-dropdown-link"
              onClick={e => e.preventDefault()}
              style={{ color: "#fff", padding: "20px 20px" }}
            >
              <CustomAvatar style={styles.profileAvatar}></CustomAvatar>
              {localStorage.getItem("name")} <Icon type="down" />
            </a>
          </Dropdown>
          {/* Render change language button */}
          <ChangeLanguage changeLanguage={this.props.changeLanguage} />
        </div>
      </Header>
    );
  }
}

/* Component Styles */
const styles = {
  header: {
    backgroundColor: "#001e1e",
    padding: 0,
    boxShadow: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)"
  },
  navBrand: {
    height: "35px",
    margin: "0 25px"
  },
  rightMenu: {
    float: "right",
    margin: "0 20px"
  },
  profileAvatar: {
    marginRight: "8px"
  },
  dropDownMenu: {
    marginTop: "0",
    padding: "0"
  },
  dropDownItem: {
    padding: "10px 20px"
  },
  MenuIcon: {
    marginRight: "10px"
  }
};
