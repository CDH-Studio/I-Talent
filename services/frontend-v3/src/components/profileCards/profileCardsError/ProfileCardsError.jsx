import React from "react";
import ProfileCardsErrorView from "./ProfileCardsErrorView";
import { NetworkErrorsPropType } from "../../../customPropTypes";

const ProfileCardsError = ({ networkErrors, title }) => {
  return <ProfileCardsErrorView networkErrors={networkErrors} title={title} />;
};

ProfileCardsError.propTypes = {
  networkErrors: NetworkErrorsPropType.isRequired,
};

export default ProfileCardsError;
