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
import { useKeycloak } from "@react-keycloak/web";
import { Layout, Dropdown, Menu, Button, Input, Row, Col } from "antd";
import { FormattedMessage, injectIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import queryString from "query-string";
import { Link } from "react-router-dom";
import ChangeLanguage from "../../../changeLanguage/ChangeLanguage";
import CustomAvatar from "../../../customAvatar/CustomAvatar";
import Logo from "../../../../assets/MyTalent-Logo-Full-v2.svg";
import { IntlPropType } from "../../../../utils/customPropTypes";

const { Header } = Layout;

const TopNavView = ({ isAdmin, loading, displaySearch, displayLogo, intl }) => {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState("");
  const [keycloak] = useKeycloak();

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
      margin: "0 25px",
    },
    navBrand: {
      height: 25,
    },
    profileAvatar: {
      marginRight: 8,
    },
    dropDownMenu: {
      padding: 0,
      marginTop: 6,
    },
    dropDownItem: {
      padding: "10px 20px",
    },
    dropDownButton: {
      color: "#fff",
      height: 35,
      padding: 0,
      marginRight: 15,
    },
    dropDownArrow: {
      marginLeft: 5,
    },
    menuIcon: {
      marginRight: 10,
    },
    signInBtn: {
      marginRight: 20,
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
        <Link rel="noopener noreferrer" to={`/profile/${id}`}>
          <UserOutlined style={styles.menuIcon} />
          <FormattedMessage id="my.profile" />
        </Link>
      </Menu.Item>
      <Menu.Item tabIndex="0" style={styles.dropDownItem}>
        <Link rel="noopener noreferrer" to="/profile/edit/primary-info">
          <EditOutlined style={styles.menuIcon} />
          <FormattedMessage id="edit.profile" />
        </Link>
      </Menu.Item>
      {isAdmin && (
        <Menu.Item tabIndex="0" style={styles.dropDownItem}>
          <Link rel="noopener noreferrer" to="/admin/dashboard">
            <DashboardOutlined style={styles.menuIcon} />
            <FormattedMessage id="admin" />
          </Link>
        </Menu.Item>
      )}
      <Menu.Item tabIndex="0" style={styles.dropDownItem}>
        <Link rel="noopener noreferrer" to="/logout">
          <LogoutOutlined style={styles.menuIcon} />
          <FormattedMessage id="sign.out" />
        </Link>
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
            style={styles.dropDownButton}
          >
            <CustomAvatar style={styles.profileAvatar} />
            <div className="navProfileName">
              {userName} <DownOutlined style={styles.dropDownArrow} />
            </div>
          </Button>
        </Dropdown>
      );
    }
    return (
      <Button
        type="primary"
        onClick={() => keycloak.login()}
        style={styles.signInBtn}
      >
        <FormattedMessage id="landing.login.button" />
      </Button>
    );
  };

  const search = () => {
    if (searchValue !== "") {
      const needsToReload = window.location.pathname.includes(
        "/results"
      );

      history.push(`/results?searchValue=${searchValue}`);

      if (needsToReload) {
        window.location.reload();
      }
    }
  };

  const getSearchInput = () =>
    displaySearch &&
    windowWidth > 800 && (
      <Input.Search
        className="searchInput"
        style={{
          width: "30%",
          minWidth: windowWidth > 900 ? 400 : undefined,
          flex: windowWidth > 900 ? undefined : 1,
          margin: "0 20px",
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
        <Link tabIndex="0" rel="noopener noreferrer" to="/">
          <HomeOutlined style={styles.menuIcon} />
          <FormattedMessage id="Home" />
        </Link>
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
      <Button
        type="primary"
        href="/"
        onClick={() => keycloak.login()}
      >
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
        <div style={styles.aroundNavContent} />
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
              <Link tabIndex="0" to="/">
                <img src={Logo} alt="I-Talent Logo" style={styles.navBrand} />
              </Link>
            )}
          </Row>

          {getSearchInput()}

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
