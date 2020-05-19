import React from "react";
import ProfileErrorView from "./profileErrorView";
import { NetworkErrorsPropType } from "../../../../customPropTypes";

const ProfileError = ({ networkErrors }) => {
  return <ProfileErrorView networkErrors={networkErrors} />;
};

ProfileError.propTypes = {
  networkErrors: NetworkErrorsPropType.isRequired,
};
export default ProfileError;
