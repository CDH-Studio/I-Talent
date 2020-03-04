import React, { Component } from "react";
import CareerInterestsView from "./careerInterestsView";

class CareerInterests extends Component {
  render() {
    const { data } = this.props;

    const name = data.firstName + " " + data.lastName;

    return (
      <CareerInterestsView
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

export default CareerInterests;
