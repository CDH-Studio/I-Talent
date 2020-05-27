import React, { Component } from "react";
import LandingNavBarView from "./landingNavBarView";
import PropTypes from "prop-types";

/** UI for the landing route's sign in navigation bar */
export default class LandingNavBarController extends Component {
  static propTypes = {
    /** Function used to change the language intl-react is using */
    changeLanguage: PropTypes.func.isRequired
  };

  render() {
    const { changeLanguage } = this.props;
    return <LandingNavBarView changeLanguage={changeLanguage} />;
  }
}
