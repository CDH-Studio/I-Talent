import React from "react";
import {
  DownOutlined,
  EditOutlined,
  LogoutOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Layout, Dropdown, Menu } from "antd";
import ChangeLanguage from "../../../changeLanguage/ChangeLanguage";
import CustomAvatar from "../../../customAvatar/CustomAvatar";
import Logo from "../../../sideNav/logo_v2.svg";
import { FormattedMessage } from "react-intl";

const { Header } = Layout;

function TopNavView(props) {
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

  // menu options for profile dropdown
  const menu = (
    <Menu style={styles.dropDownMenu}>
      <Menu.Item tabIndex="0" style={styles.dropDownItem}>
        <a rel="noopener noreferrer" href="/secured/profile/">
          <UserOutlined style={styles.MenuIcon} />
          <FormattedMessage id="my.profile" />
        </a>
      </Menu.Item>
      <Menu.Item tabIndex="0" style={styles.dropDownItem}>
        <a rel="noopener noreferrer" href="/secured/profile/edit">
          <EditOutlined style={styles.MenuIcon} />
          <FormattedMessage id="edit.profile" />
        </a>
      </Menu.Item>
      <Menu.Item tabIndex="0" style={styles.dropDownItem}>
        <a rel="noopener noreferrer" href="/secured/logout">
          <LogoutOutlined style={styles.MenuIcon} />
          <FormattedMessage id="sign.out" />
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header style={styles.header}>
      {/* Render logo */}
      <a href="/secured/home">
        <img tabIndex="0" src={Logo} alt="Logo" style={styles.navBrand} />
      </a>
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
            {localStorage.getItem("name")} <DownOutlined />
          </a>
        </Dropdown>
        {/* Render change language button */}
        <ChangeLanguage changeLanguage={props.changeLanguage} />
      </div>
    </Header>
  );
}

export default TopNavView;
