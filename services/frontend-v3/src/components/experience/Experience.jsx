import React, { Component } from "react";
import ExperienceView from "./ExperienceView";

class Experience extends Component {
  render() {
    const { data } = this.props;

    return (
      <ExperienceView
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

export default Experience;
