import React, { Component } from "react";
import TalentManagementView from "./TalentManagementView";

class TalentManagement extends Component {
  render() {
    const { data } = this.props;

    return (
      <TalentManagementView
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

export default TalentManagement;
