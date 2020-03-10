import React, { useState } from "react";
import CustomAvatarView from "./CustomAvatarView";

function CustomAvatar(props) {
  const [initials, setInitials] = useState("JD");
  const [avatarColor, setAvatarColor] = useState("green");

  // Use helper functions to set user initials and icon color
  // const computeInfo = () => {
  //   getUserInitials();
  //   stringToHslColor(initials);
  // };

  // Extract the User's initials from their name
  // const getUserInitials = () => {
  //   const name = localStorage.getItem("name") || "..";
  //   var computedInitials = name.match(/\b\w/g) || [];
  //   computedInitials = (
  //     (computedInitials.shift() || "") + (computedInitials.pop() || "")
  //   ).toUpperCase();
  //   setInitials(computedInitials);
  // };

  // // Generate color for avatar
  // // TODO: This must be move somewhere where it is calculated only once on sign-in
  // const stringToHslColor = str => {
  //   var hash = 0;
  //   var s = 90;
  //   var l = 45;
  //   for (var i = 0; i < str.length; i++) {
  //     hash = str.charCodeAt(i) + ((hash << 5) - hash);
  //   }
  //   var h = hash % 360;
  //   setAvatarColor("hsl(" + h + ", " + s + "%, " + l + "%)");
  // };

  //computeInfo();

  return (
    <CustomAvatarView
      initials={initials}
      color={avatarColor}
      style={props.style}
    ></CustomAvatarView>
  );
}

export default CustomAvatar;
