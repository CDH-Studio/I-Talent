import React from "react";
import { Menu } from "antd";
import { injectIntl, FormattedMessage } from "react-intl";
import { useKeycloak } from "@react-keycloak/web";
import ChangeLanguage from "../../changeLanguage/ChangeLanguage";
import Logo from "../../../assets/Logo5.png";

/** UI for the landing route's sign in navigation bar */
const LandingNavBarView = () => {
  const [keycloak] = useKeycloak();
  return (
    <Menu color="blue" fixed="top" fluid inverted>
      <Menu.Item style={{ paddingBottom: "8px", paddingTop: "8px" }}>
        <img src={Logo} style={{ maxWidth: "37px" }} alt="I-Talent Logo" />
      </Menu.Item>
      <Menu.Item
        position="right"
        href="/secured/home"
        onClick={() => keycloak.login()}
        tabIndex="0"
      >
        <FormattedMessage id="landing.login.and.enter" />
      </Menu.Item>
      <ChangeLanguage />
    </Menu>
  );
};

export default injectIntl(LandingNavBarView);
