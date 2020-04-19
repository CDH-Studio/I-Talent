import React from "react";
import {
  DownOutlined,
  EditOutlined,
  LogoutOutlined,
  UserOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Layout, Dropdown, Menu } from "antd";
import ChangeLanguage from "../../../changeLanguage/ChangeLanguage";
import CustomAvatar from "../../../customAvatar/CustomAvatar";
import Logo from "../../../../assets/MyTalent-Logo-Full.png";
import { FormattedMessage } from "react-intl";

const { Header } = Layout;

function TopNavView(props) {
  /* Component Styles */
  const styles = {
    header: {
      backgroundColor: "#192e2f",
      padding: 0,
      boxShadow: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)",
      position: "fixed",
      zIndex: 1,
      width: "100%",
    },
    navBrand: {
      height: "35px",
      margin: "0 25px",
    },
    rightMenu: {
      float: "right",
      margin: "0 20px",
    },
    profileAvatar: {
      marginRight: "8px",
    },
    dropDownMenu: {
      marginTop: "0",
      padding: "0px",
    },
    dropDownItem: {
      padding: "10px 20px",
    },
    MenuIcon: {
      marginRight: "10px",
    },
  };

  // menu options for profile dropdown
  const menu = (
    <Menu style={styles.dropDownMenu}>
      <Menu.Item style={styles.dropDownItem}>
        <a
          rel="noopener noreferrer"
          href={"/secured/profile/" + localStorage.getItem("userId")}
        >
          <UserOutlined style={styles.MenuIcon} />
          <FormattedMessage id="my.profile" />
        </a>
      </Menu.Item>
      <Menu.Item style={styles.dropDownItem}>
        <a rel="noopener noreferrer" href="/secured/profile/edit/primary-info">
          <EditOutlined style={styles.MenuIcon} />
          <FormattedMessage id="edit.profile" />
        </a>
      </Menu.Item>
      {sessionStorage.getItem("admin") === "true" ? (
        <Menu.Item
          disabled={localStorage.getItem("admin")}
          style={styles.dropDownItem}
        >
          <a rel="noopener noreferrer" href="/admin/dashboard">
            <DashboardOutlined style={styles.MenuIcon} />
            <FormattedMessage id="admin" />
          </a>
        </Menu.Item>
      ) : null}
      <Menu.Item style={styles.dropDownItem}>
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
        <img src={Logo} alt="Logo" style={styles.navBrand} />
      </a>
      {/* Render right sigh of top menu */}
      <div style={styles.rightMenu}>
        {/* Render User Profile Dropdown */}
        <Dropdown overlay={menu} placement="bottomCenter" trigger="click">
          <a
            className="ant-dropdown-link"
            onClick={(e) => e.preventDefault()}
            style={{ color: "#fff", padding: "20px 20px" }}
          >
            <CustomAvatar style={styles.profileAvatar}></CustomAvatar>
            <div className={"navProfileName"}>
              {localStorage.getItem("name")} <DownOutlined />
            </div>
          </a>
        </Dropdown>
        {/* Render change language button */}
        <ChangeLanguage changeLanguage={props.changeLanguage} />
      </div>
    </Header>
  );
}

export default TopNavView;
