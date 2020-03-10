import React, { Component } from "react";
import EmploymentInfoView from "./EmploymentInfoView";

class EmploymentInfo extends Component {
  render() {
    const { data } = this.props;

    return (
      <EmploymentInfoView
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

export default EmploymentInfo;
