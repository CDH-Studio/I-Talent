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
          acr: getAcronym(name),
          color: stringToHslColor(getAcronym(name))
        }}
        jobTitle={data.jobTitle[localStorage.getItem("lang")]}
      />
    );
  }
}

function stringToHslColor(str) {
  var hash = 0;
  var s = 90;
  var l = 45;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var h = hash % 360;
  return "hsl(" + h + ", " + s + "%, " + l + "%)";
}

function getAcronym(name) {
  const i = name.lastIndexOf(" ") + 1;
  return name.substring(0, 1) + name.substring(i, i + 1);
}

export default ProfileHeader;
