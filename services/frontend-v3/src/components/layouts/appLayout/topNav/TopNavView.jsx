import React, { useState, useEffect } from "react";
import {
  DownOutlined,
  EditOutlined,
  LogoutOutlined,
  UserOutlined,
  DashboardOutlined,
  MenuOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Layout, Dropdown, Menu, Button } from "antd";
import { FormattedMessage } from "react-intl";
import ChangeLanguage from "../../../changeLanguage/ChangeLanguage";
import CustomAvatar from "../../../customAvatar/CustomAvatar";
import Logo from "../../../../assets/MyTalent-Logo-Full-v2.svg";

const { Header } = Layout;

const TopNavView = () => {
  /* Component Styles */
  const styles = {
    header: {
      backgroundColor: "#192e2f",
      padding: 0,
      boxShadow: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)",
      position: "fixed",
      zIndex: 2,
      width: "100%",
    },
    navBrand: {
      height: "25px",
      marginLeft: "25px",
    },
    rightMenu: {
      float: "right",
      margin: "0 20px",
    },
    profileAvatar: {
      marginRight: "8px",
    },
    dropDownMenu: {
      marginTop: "23px",
      padding: "0px",
    },
    dropDownItem: {
      padding: "10px 20px",
    },
    MenuIcon: {
      marginRight: "10px",
    },
    signInBtn: {
      marginRight: "20px",
    },
    hamburgerMenu: {
      paddingBottom: 23,
      boxShadow: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)",
    },
    hamburgerHeader: {
      justifyContent: "space-between",
      display: "flex",
      alignItems: "center",
      height: "100%",
      padding: "0 20px",
    },
  };

  const [showMenu, setShowMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const updateWidth = () => setWindowWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // menu options for profile dropdown
  const menu = (isDropdown, optionalStartMenuItems) => (
    <Menu style={isDropdown ? styles.dropDownMenu : styles.hamburgerMenu}>
      {optionalStartMenuItems}
      <Menu.Item style={styles.dropDownItem}>
        <a
          rel="noopener noreferrer"
          href={`/secured/profile/${localStorage.getItem("userId")}`}
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

  const getAvatarDropdown = (userName) => {
    if (userName) {
      return (
        <Dropdown
          overlay={() => menu(true)}
          placement="bottomCenter"
          trigger="click"
        >
          <Button
            type="link"
            className="ant-dropdown-link"
            style={{ color: "#fff", padding: "10px 20px" }}
          >
            <CustomAvatar style={styles.profileAvatar} />
            <div className="navProfileName">
              {userName} <DownOutlined />
            </div>
          </Button>
        </Dropdown>
      );
    }
    return (
      <Button type="primary" href="/secured/home" style={styles.signInBtn}>
        <FormattedMessage id="landing.login.button" />
      </Button>
    );
  };

  const hamburgerMenu = () =>
    showMenu &&
    menu(
      false,
      <Menu.Item style={styles.dropDownItem}>
        <a rel="noopener noreferrer" href="/secured/home">
          <HomeOutlined style={styles.MenuIcon} />
          <FormattedMessage id="Home" />
        </a>
      </Menu.Item>
    );

  const hamburgerButton = (userName) => {
    if (userName) {
      return (
        <Button type="default" onClick={() => setShowMenu((prev) => !prev)}>
          <MenuOutlined />
        </Button>
      );
    }

    return (
      <Button type="primary" href="/secured/home">
        <FormattedMessage id="landing.login.button" />
      </Button>
    );
  };

  if (windowWidth > 400) {
    return (
      <Header style={styles.header}>
        {/* Render logo */}
        <a href="/secured/home">
          <img src={Logo} alt="Logo" style={styles.navBrand} />
        </a>
        {/* Render right sigh of top menu */}
        <div style={styles.rightMenu}>
          {/* Render User Profile Dropdown */}
          {getAvatarDropdown(localStorage.getItem("name"))}
          {/* Render change language button */}
          <ChangeLanguage />
        </div>
      </Header>
    );
  }

  return (
    <>
      <Header style={styles.header}>
        <div style={styles.hamburgerHeader}>
          <ChangeLanguage />

          {hamburgerButton(localStorage.getItem("name"))}
        </div>
        {hamburgerMenu()}
      </Header>
    </>
  );
};

export default TopNavView;
