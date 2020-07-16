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
import PropTypes from "prop-types";
import { Layout, Dropdown, Menu, Button, Input, Row, Col } from "antd";
import { FormattedMessage, injectIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import queryString from "query-string";
import ChangeLanguage from "../../../changeLanguage/ChangeLanguage";
import CustomAvatar from "../../../customAvatar/CustomAvatar";
import Logo from "../../../../assets/MyTalent-Logo-Full-v2.svg";
import { IntlPropType } from "../../../../customPropTypes";

const { Header } = Layout;

const TopNavView = ({ isAdmin, loading, displaySearch, displayLogo, intl }) => {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState("");

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
    aroundNavContent: {
      marginLeft: "25px",
    },
    navBrand: {
      height: "25px",
    },
    rightMenu: {
      float: "right",
      margin: "0px 20px",
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
      margin: "0 20px",
    },
  };

  const { id, name } = useSelector((state) => state.user);

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
      <Menu.Item tabIndex="0" style={styles.dropDownItem}>
        <a rel="noopener noreferrer" href={`/secured/profile/${id}`}>
          <UserOutlined style={styles.MenuIcon} />
          <FormattedMessage id="my.profile" />
        </a>
      </Menu.Item>
      <Menu.Item tabIndex="0" style={styles.dropDownItem}>
        <a rel="noopener noreferrer" href="/secured/profile/edit/primary-info">
          <EditOutlined style={styles.MenuIcon} />
          <FormattedMessage id="edit.profile" />
        </a>
      </Menu.Item>
      {isAdmin && (
        <Menu.Item tabIndex="0" style={styles.dropDownItem}>
          <a rel="noopener noreferrer" href="/admin/dashboard">
            <DashboardOutlined style={styles.MenuIcon} />
            <FormattedMessage id="admin" />
          </a>
        </Menu.Item>
      )}
      <Menu.Item tabIndex="0" style={styles.dropDownItem}>
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

  const search = () => {
    if (searchValue !== "") {
      const needsToReload = window.location.pathname.includes(
        "/secured/results"
      );

      history.push(`/secured/results?searchValue=${searchValue}`);

      if (needsToReload) {
        window.location.reload();
      }
    }
  };

  const getSearchInput = () =>
    displaySearch && windowWidth > 800 && (
      <Input.Search
        className="searchInput"
        style={{
          width: 250,
          marginLeft: 30,
        }}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        enterButton
        onSearch={search}
        placeholder={intl.formatMessage({
          id: "button.search",
        })}
      />
    );

  const hamburgerMenu = () =>
    showMenu &&
    menu(
      false,
      <Menu.Item style={styles.dropDownItem}>
        <a tabIndex="0" rel="noopener noreferrer" href="/secured/home">
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

  useEffect(() => {
    const querySearchData = queryString.parse(history.location.search);

    setSearchValue(querySearchData.searchValue);
  }, [history.location.search]);

  if (loading) {
    return (
      <Header style={styles.header}>
        <div style={styles.aroundNavContent}>
          {displayLogo && (
            <img src={Logo} alt="I-Talent Logo" style={styles.navBrand} />
          )}
        </div>
      </Header>
    );
  }

  if (windowWidth > 400) {
    return (
      <Header style={styles.header}>
        <Row
          style={styles.aroundNavContent}
          justify="space-between"
          align="middle"
        >
          <Row align="middle">
            {displayLogo && (
              <a tabIndex="0" href="/secured/home">
                <img src={Logo} alt="I-Talent Logo" style={styles.navBrand} />
              </a>
            )}
            {getSearchInput()}
          </Row>

          <Col style={styles.rightMenu}>
            {getAvatarDropdown(name)}
            <ChangeLanguage />
          </Col>
        </Row>
      </Header>
    );
  }

  return (
    <>
      <Header style={styles.header}>
        <div style={styles.hamburgerHeader}>
          <ChangeLanguage />

          {hamburgerButton(name)}
        </div>
        {hamburgerMenu()}
      </Header>
    </>
  );
};

TopNavView.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  displaySearch: PropTypes.bool.isRequired,
  displayLogo: PropTypes.bool.isRequired,
  intl: IntlPropType,
};

TopNavView.defaultProps = {
  intl: undefined,
};

export default injectIntl(TopNavView);
