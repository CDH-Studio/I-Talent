import React from "react";
import { Menu } from "antd";
import { injectIntl, FormattedMessage } from "react-intl";
import ChangeLanguage from "../../changeLanguage/ChangeLanguage";
import Logo from "../../../assets/Logo5.png";

/** UI for the landing route's sign in navigation bar */
const LandingNavBarView = () => {
  return (
    <Menu color="blue" fixed="top" fluid inverted>
      <Menu.Item style={{ paddingBottom: "8px", paddingTop: "8px" }}>
        <img src={Logo} style={{ maxWidth: "37px" }} alt="UpSkill Logo" />
      </Menu.Item>
      <Menu.Item position="right" href="/secured/home" tabIndex="0">
        <FormattedMessage id="landing.login.and.enter" />
      </Menu.Item>

      <ChangeLanguage />
    </Menu>
  );
};

export default injectIntl(LandingNavBarView);
