import React, { Component } from "react";
import LandingLayoutView from "./landingLayoutView";

import PropTypes from "prop-types";

/** Logic for the landing route layout */
export default class LandingLayout extends Component {
  static propTypes = {
    /** Function used to change the language intl-react is using */
    changeLanguage: PropTypes.func.isRequired
  };

  render() {
    const { changeLanguage } = this.props;
    return <LandingLayoutView changeLanguage={changeLanguage} />;
  }
}
