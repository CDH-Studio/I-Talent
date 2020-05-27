import React, { Component } from "react";
import { Menu, Image } from "semantic-ui-react";
import { injectIntl, FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import ChangeLanguage from "../../../components/changeLanguage/ChangeLanguage";
import Logo from "../../../assets/Logo5.png";

/** UI for the landing route's sign in navigation bar */
class LandingNavBarView extends Component {
  static propTypes = {
    /** Function used to change the language intl-react is using */
    changeLanguage: PropTypes.func.isRequired
  };

  render() {
    const { changeLanguage } = this.props;
    return (
      <Menu color="blue" fixed="top" fluid inverted>
        <Menu.Item style={{ paddingBottom: "8px", paddingTop: "8px" }}>
          <Image src={Logo} style={{ maxWidth: "37px" }} />
        </Menu.Item>
        <Menu.Item position="right" href="/secured/home" tabIndex="0">
          <FormattedMessage id="landing.login.and.enter" />
        </Menu.Item>

        <ChangeLanguage changeLanguage={changeLanguage} />
      </Menu>
    );
  }
}

export default injectIntl(LandingNavBarView);
