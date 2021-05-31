/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState, useEffect } from "react";
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
import { Layout, Dropdown, Menu, Button, Input, Row, Typography } from "antd";
import { FormattedMessage, injectIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import queryString from "query-string";
import { Link } from "react-router-dom";
import ChangeLanguage from "../../../changeLanguage/ChangeLanguage";
import CustomAvatar from "../../../customAvatar/CustomAvatar";
import Logo from "../../../../assets/I-talent-logo-light.png";
import { IntlPropType } from "../../../../utils/customPropTypes";
import "./TopNavView.less";

const { Header } = Layout;
const { Text } = Typography;

const TopNavView = ({ isAdmin, loading, displaySearch, displayLogo, intl }) => {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState("");
  const { keycloak } = useKeycloak();

  const { id, firstName, lastName, name, status } = useSelector(
    (state) => state.user
  );

  const [showMenu, setShowMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
      // Ant-design issue: recognizes either depending on machine
      // "-1" is used for off-screen content that appears on a specific event
      /* eslint-disable react/jsx-no-duplicate-props */
      tabIndex={-1}
      tabindex="-1"
      /* eslint-enable react/jsx-no-duplicate-props */
      className={isDropdown ? "dropDownMenu" : "hamburgerMenu"}
    >
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
          <FormattedMessage id="settings" />
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
          overlay={() => menu(true)}
          placement="bottomCenter"
          trigger={["click"]}
          getPopupContainer={(triggerNode) => triggerNode.parentNode}
          showAction={["focus"]}
        >
          <Button type="link" className="nav-dropDownButton ant-dropdown-link">
            <CustomAvatar
              style={{
                marginRight: 8,
                height: "35px",
                width: "35px",
                lineHeight: "35px",
              }}
              hidden={status === "HIDDEN" || status === "INACTIVE"}
            />
            <Text id="nav-dropDownButton-name" ellipsis>
              {shortenName(firstName, lastName)}
            </Text>
            <DownOutlined className="dropDownArrow" />
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
        style={{
          width: "30%",
          minWidth: windowWidth > 920 ? 400 : undefined,
          flex: windowWidth > 920 ? undefined : 1,
          margin: "0 20px",
        }}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        enterButton
        onSearch={search}
        placeholder={intl.formatMessage({
          id: "search",
        })}
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
            <HomeOutlined className="menuIcon" />
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
        <Button type="default" onClick={toggleHamburgerMenu}>
          <MenuOutlined />
        </Button>
      );
    }

    return (
      <Button type="primary" href="/" onClick={() => keycloak.login()}>
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
      <Header className="header" role="banner">
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

          <Row align="middle">
            <div>{getAvatarDropdown(name)}</div>
            <ChangeLanguage />
          </Row>
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
      {showMenu && (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div className="hamburgerOverlay" onClick={toggleHamburgerMenu} />
      )}
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
