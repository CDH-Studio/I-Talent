import React, { useState, useEffect } from "react";
import {
  DownOutlined,
  EditOutlined,
  LogoutOutlined,
  UserOutlined,
  DashboardOutlined,
  MenuOutlined,
  HomeOutlined,
  AreaChartOutlined,
  SettingOutlined,
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
import Logo from "../../../../assets/I-talent-logo-light.png";
import { IntlPropType } from "../../../../utils/customPropTypes";
import "./TopNavView.scss";

const { Header } = Layout;

const TopNavView = ({ isAdmin, loading, displaySearch, displayLogo, intl }) => {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState("");
  const { keycloak } = useKeycloak();

  const { id, name, status } = useSelector((state) => state.user);

  const [showMenu, setShowMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const updateWidth = () => setWindowWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // menu options for profile dropdown
  const menu = (isDropdown, optionalStartMenuItems) => (
    <Menu className={isDropdown ? "dropDownMenu" : "hamburgerMenu"}>
      {optionalStartMenuItems}
      <Menu.Item className="dropDownItem">
        <Link to={`/profile/${id}`}>
          <UserOutlined className="menuIcon" />
          <FormattedMessage id="my.profile" />
        </Link>
      </Menu.Item>
      <Menu.Item className="dropDownItem">
        <Link to="/profile/edit/primary-info">
          <EditOutlined className="menuIcon" />
          <FormattedMessage id="edit.profile" />
        </Link>
      </Menu.Item>
      <Menu.Divider />
      {isAdmin && (
        <Menu.Item className="dropDownItem">
          <Link to="/admin/dashboard">
            <DashboardOutlined className="menuIcon" />
            <FormattedMessage id="admin" />
          </Link>
        </Menu.Item>
      )}
      {!isAdmin && (
        <Menu.Item className="dropDownItem">
          <Link to="/statistics">
            <AreaChartOutlined className="menuIcon" />
            <FormattedMessage id="stats.view" />
          </Link>
        </Menu.Item>
      )}
      <Menu.Item className="dropDownItem">
        <Link to="/settings">
          <SettingOutlined className="menuIcon" />
          <FormattedMessage id="settings.title" />
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item className="dropDownItem">
        <Link to="/logout">
          <LogoutOutlined className="menuIcon" />
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
          <Button type="link" className="nav-dropDownButton ant-dropdown-link">
            <CustomAvatar
              style={{ marginRight: 8 }}
              hidden={status === "HIDDEN" || status === "INACTIVE"}
            />
            <div className="navProfileName">
              {userName} <DownOutlined className="dropDownArrow" />
            </div>
          </Button>
        </Dropdown>
      );
    }
    return undefined;
  };

  const search = () => {
    if (searchValue && searchValue.length > 0) {
      const needsToReload = window.location.pathname.includes("/results");

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
      <Menu.Item className="dropDownItem">
        <Link tabIndex={0} to="/">
          <HomeOutlined className="menuIcon" />
          <FormattedMessage id="home" />
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
      <Button type="primary" href="/" onClick={() => keycloak.login()}>
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
      <Header className="header">
        <div className="aroundNavContent" />
      </Header>
    );
  }

  if (windowWidth > 400) {
    return (
      <Header className="header">
        <Row
          className="aroundNavContent"
          justify="space-between"
          align="middle"
        >
          <Row align="middle">
            {displayLogo && (
              <Link tabIndex={0} to="/">
                <img src={Logo} alt="I-Talent Logo" className="navBrand" />
              </Link>
            )}
          </Row>

          {getSearchInput()}

          <Col className="rightMenu">
            {getAvatarDropdown(name)}
            <ChangeLanguage />
          </Col>
        </Row>
      </Header>
    );
  }

  return (
    <>
      <Header className="header">
        <div className="hamburgerHeader">
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
