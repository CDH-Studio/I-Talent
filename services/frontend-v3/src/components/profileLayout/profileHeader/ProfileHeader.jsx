import React, { Component } from "react";
import HeaderView from "./ProfileHeaderView";

class ProfileHeader extends Component {
  render() {
    const { data } = this.props;

    const name = data.firstName + " " + data.lastName;

    return (
      <HeaderView
        name={name}
        avatar={{
          acr: data.acronym,
          color: data.color
        }}
        jobTitle={data.jobTitle[localStorage.getItem("lang")]}
      />
    );
  }
}

export default ProfileHeader;
