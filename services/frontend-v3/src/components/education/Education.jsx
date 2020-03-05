import React, { Component } from "react";
import EducationView from "./EducationView";

class Education extends Component {
  render() {
    const { data } = this.props;

    return (
      <EducationView
        data={data}
        avatar={{
          acr: data.acronym,
          color: data.color
        }}
        locale={localStorage.getItem("lang")}
      />
    );
  }
}

export default Education;
