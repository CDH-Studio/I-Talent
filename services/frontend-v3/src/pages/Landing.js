//PREEXISTING CODE

import React, { Component } from "react";
import LandingLayout from "../components/landingLayout/landingLayout";

import "./landing.css";

export default class Landing extends Component {
  goto = link => this.props.history.push(link);

  render() {
    const { changeLanguage } = this.props;
    return <LandingLayout changeLanguage={changeLanguage} />;
  }
}
