import React, { Component } from "react";
import CareerInterestsView from "./CareerInterestsView";

class CareerInterests extends Component {
  render() {
    const { data } = this.props;

    return (
      <CareerInterestsView
        data={data}
        avatar={{
          acr: data.nameInitials,
          color: data.avatarColor
        }}
        locale={localStorage.getItem("lang")}
      />
    );
  }
}

export default CareerInterests;
