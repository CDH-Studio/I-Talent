import React from "react";
import ProfileErrorView from "./profileErrorView";

const ProfileError = ({ networkError }) => {
  return <ProfileErrorView networkError={networkError} />;
};

export default ProfileError;
