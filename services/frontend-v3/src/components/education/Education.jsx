import React, { Component } from "react";
import EducationView from "./EducationView";

class Education extends Component {
  render() {
    const { data } = this.props;

    return <EducationView data={data} locale={localStorage.getItem("lang")} />;
  }
}

export default Education;
