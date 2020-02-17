import React, { Component } from "react";
import DevelopmentalGoalsFormView from "./developmentalGoalsFormView";

export default class DevelopmentalGoalsFormController extends Component {
  render() {
    return <DevelopmentalGoalsFormView {...this.props} />;
  }
}
