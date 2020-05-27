import React, { Component } from "react";
import CompetenciesFormView from "./competenciesFormView";

export default class CompeneciesFormController extends Component {
  render() {
    return <CompetenciesFormView {...this.props} />;
  }
}
