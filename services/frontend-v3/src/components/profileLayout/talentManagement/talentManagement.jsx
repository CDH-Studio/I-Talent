import React, { Component } from "react";
import TalentManagementView from "./talentManagementView";

class TalentManagement extends Component {
  render() {
    const { data } = this.props;

    const name = data.firstName + " " + data.lastName;

    return (
      <TalentManagementView
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

export default TalentManagement;
