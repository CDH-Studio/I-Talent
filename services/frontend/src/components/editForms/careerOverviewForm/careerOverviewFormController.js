import React, { Component } from "react";
import CareerOverviewView from "./careerOverviewFormView";

export default class CareerOverviewController extends Component {
  render() {
    return <CareerOverviewView {...this.props} />;
  }
}
