import "./TopNavView.less";

import {
  AreaChartOutlined,
  DashboardOutlined,
  DownOutlined,
  EditOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuOutlined,
  SearchOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useKeycloak } from "@react-keycloak/web";
import { Button, Dropdown, Input, Layout, Menu, Row, Typography } from "antd";
import PropTypes from "prop-types";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import Logo from "../../../../assets/I-talent-logo-light.png";
import ChangeLanguage from "../../../changeLanguage/ChangeLanguage";
import CustomAvatar from "../../../customAvatar/CustomAvatar";

const { Header } = Layout;
const { Text } = Typography;

const TopNavView = ({ isAdmin, loading, displaySearch, displayLogo }) => {
  const history = useHistory();
  const { keycloak } = useKeycloak();
  const intl = useIntl();

  const { id, firstName, lastName, name, status } = useSelector(
    (state) => state.user
  );

  const [searchValue, setSearchValue] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [profileMenuIsExpanded, setProfileMenuIsExpanded] = useState(false);

  const updateWidth = () => setWindowWidth(window.innerWidth);

  /*
   * Generate Menu Options for Profile Dropdown
   *
   */
  const shortenName = (fullFirstName, fulLastName) =>
    `${fullFirstName} ${fulLastName.charAt(0)}.`;

  /*
   * Generate Menu Options for Profile Dropdown
   *
   */
  const menu = (isDropdown, optionalStartMenuItems) => (
    <Menu
      className={isDropdown ? "dropDownMenu" : "hamburgerMenu"}
      tabIndex={-1}
    >
      {optionalStartMenuItems}
      <Menu.Item key="profile_menu" className="dropDownItem">
        <Link to={`/profile/${id}`}>
          <UserOutlined aria-hidden="true" className="mr-2" />
          <FormattedMessage id="my.profile" />
        </Link>
      </Menu.Item>
      <Menu.Item key="edit_menu" className="dropDownItem">
        <Link to="/profile/edit/primary-info">
          <EditOutlined aria-hidden="true" className="mr-2" />
          <FormattedMessage id="edit.profile" />
        </Link>
      </Menu.Item>
      <Menu.Divider />
      {isAdmin && (
        <Menu.Item key="admin_menu" className="dropDownItem">
          <Link to="/admin/dashboard">
            <DashboardOutlined aria-hidden="true" className="mr-2" />
            <FormattedMessage id="admin" />
          </Link>
        </Menu.Item>
      )}
      {!isAdmin && (
        <Menu.Item key="stats_menu" className="dropDownItem">
          <Link to="/statistics">
            <AreaChartOutlined aria-hidden="true" className="mr-2" />
            <FormattedMessage id="stats.view" />
          </Link>
        </Menu.Item>
      )}
      <Menu.Item key="settings_menu" className="dropDownItem">
        <Link to="/settings">
          <SettingOutlined aria-hidden="true" className="mr-2" />
          <FormattedMessage id="settings" />
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout_menu" className="dropDownItem">
        <Link to="/logout">
          <LogoutOutlined aria-hidden="true" className="mr-2" />
          <FormattedMessage id="sign.out" />
        </Link>
      </Menu.Item>
    </Menu>
  );
  /* eslint-enable react/jsx-no-duplicate-props */

  /*
   * Generate Dropdown Button With Avatar
   *
   * Generates basic info card header
   * This includes: avatar, name, position
   */
  const getAvatarDropdown = (userName) => {
    if (userName) {
      return (
        <Dropdown
          getPopupContainer={(triggerNode) => triggerNode.parentNode}
          onVisibleChange={() => {
            setProfileMenuIsExpanded((prev) => !prev);
          }}
          overlay={() => menu(true)}
          placement="bottomCenter"
          trigger={["click"]}
        >
          <Button
            aria-expanded={profileMenuIsExpanded ? "true" : "false"}
            aria-haspopup="true"
            aria-label={intl.formatMessage({
              id: "profile.navigation.dropdown",
            })}
            className="nav-dropDownButton ant-dropdown-link"
            type="link"
          >
            <CustomAvatar
              hidden={status === "HIDDEN" || status === "INACTIVE"}
              style={{
                marginRight: 8,
                height: "35px",
                width: "35px",
                lineHeight: "35px",
              }}
            />
            <Text ellipsis id="nav-dropDownButton-name">
              {shortenName(firstName, lastName)}
            </Text>
            <DownOutlined aria-hidden="true" className="dropDownArrow" />
          </Button>
        </Dropdown>
      );
    }
    return undefined;
  };

  /*
   * Implement Search bar Functionality
   *
   * Send fuzzy search term to API endpoint
   */
  const search = () => {
    if (searchValue && searchValue.length > 0) {
      history.push(`/results?searchValue=${searchValue}`);
    }
  };

  /*
   * Render the Search Bar
   *
   */
  const getSearchInput = () =>
    displaySearch &&
    windowWidth > 800 && (
      <Input.Search
        className="searchInput"
        enterButton={
          <>
            <SearchOutlined aria-hidden="true" className="mr-1" />
            <FormattedMessage id="search" />
          </>
        }
        onChange={(e) => setSearchValue(e.target.value)}
        onSearch={search}
        placeholder={intl.formatMessage({
          id: "search",
        })}
        style={{
          width: "30%",
          minWidth: windowWidth > 920 ? 400 : undefined,
          flex: windowWidth > 920 ? undefined : 1,
          margin: "0 20px",
        }}
        value={searchValue}
      />
    );

  /*
   * Generate the Hamburger Menu for Mobile
   *
   */
  const hamburgerMenu = () =>
    showMenu &&
    menu(
      false,
      <>
        <Menu.Divider />
        <Menu.Item className="dropDownItem">
          <Link tabIndex={0} to="/">
            <HomeOutlined className="mr-2" />
            <FormattedMessage id="home" />
          </Link>
        </Menu.Item>
      </>
    );

  /*
   * Toggle to Open and Close Hamburger Menu
   *
   */
  const toggleHamburgerMenu = () => setShowMenu((prev) => !prev);

  /*
   * Generate the Hamburger Menu Btn for Mobile
   *
   */
  const hamburgerButton = (userName) => {
    if (userName) {
      return (
        <Button onClick={toggleHamburgerMenu} type="default">
          <MenuOutlined />
        </Button>
      );
    }

    return (
      <Button href="/" onClick={() => keycloak.login()} type="primary">
        <FormattedMessage id="sign.in" />
      </Button>
    );
  };

  useEffect(() => {
    const querySearchData = queryString.parse(history.location.search);
    setSearchValue(querySearchData.searchValue);
  }, [history.location.search]);

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  if (loading) {
    return (
      <Header className="header">
        <div className="aroundNavContent" />
      </Header>
    );
  }

  if (windowWidth > 450) {
    return (
      <div role="banner">
        <Header className="header">
          <Row
            align="middle"
            className="aroundNavContent"
            justify="space-between"
          >
            <Row align="middle">
              {displayLogo && (
                <Link tabIndex={0} to="/">
                  <img alt="I-Talent Logo" className="navBrand" src={Logo} />
                </Link>
              )}
            </Row>

            {getSearchInput()}

            <Row align="middle">
              <div>{getAvatarDropdown(name)}</div>
              <ChangeLanguage />
            </Row>
          </Row>
        </Header>
      </div>
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
      {showMenu && (
        <Button className="hamburgerOverlay" onClick={toggleHamburgerMenu} />
      )}
    </>
  );
};

TopNavView.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  displaySearch: PropTypes.bool.isRequired,
  displayLogo: PropTypes.bool.isRequired,
};

export default TopNavView;
