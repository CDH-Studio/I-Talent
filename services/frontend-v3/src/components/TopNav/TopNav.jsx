import React from "react";
import {} from "antd";

import TopNavView from "./TopNavView";
import PropTypes from "prop-types";

export default class TopNav extends React.Component {
  render() {
    return <TopNavView changeLanguage={this.props.changeLanguage}></TopNavView>;
  }
}
