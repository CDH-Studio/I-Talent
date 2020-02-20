import React from "react";
import {} from "antd";
import CustomAvatarView from "../CustomAvatar/CustomAvatarView";

export default class CustomAvatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initials: "JD",
      color: "green"
    };
  }

  // Use helper functions to set user initials and icon color
  computeInfo() {
    this.getUserInitials();
    this.stringToHslColor(this.initials);
  }

  // Extract the User's initials from their name
  getUserInitials() {
    const name = localStorage.getItem("name");
    var initials = name.match(/\b\w/g) || [];
    initials = (
      (initials.shift() || "") + (initials.pop() || "")
    ).toUpperCase();
    this.initials = initials;
  }

  // Generate color for avatar
  // TODO: This must be move somewhere where it is calculated only oncee on sign-in
  stringToHslColor(str) {
    var hash = 0;
    var s = 90;
    var l = 45;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var h = hash % 360;
    this.color = "hsl(" + h + ", " + s + "%, " + l + "%)";
  }

  render() {
    this.computeInfo();
    return (
      <CustomAvatarView
        initials={this.initials}
        color={this.color}
        style={this.props.style}
      ></CustomAvatarView>
    );
  }
}
