import React, { Component } from "react";
import ProjectsFormView from "./projectsFormView";

export default class projectsFormController extends Component {
  render() {
    return <ProjectsFormView {...this.props} />;
  }
}
