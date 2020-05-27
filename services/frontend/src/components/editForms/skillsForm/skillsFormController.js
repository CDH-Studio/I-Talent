import React, { Component } from "react";
import SkillsFormView from "./skillsFormView";

export default class skillsFormController extends Component {
  render() {
    return <SkillsFormView {...this.props} />;
  }
}
