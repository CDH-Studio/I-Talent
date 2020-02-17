import React, { Component } from "react";
import EducationFormView from "./educationFormView";

export default class EducationFormController extends Component {
  render() {
    return <EducationFormView {...this.props} />;
  }
}
