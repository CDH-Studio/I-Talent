import React from "react";
import PropTypes from "prop-types";
import ProfileCardsErrorView from "./ProfileCardsErrorView";
import { NetworkErrorsPropType } from "../../../customPropTypes";

const ProfileCardsError = ({ networkErrors, title }) => {
  return <ProfileCardsErrorView networkErrors={networkErrors} title={title} />;
};

ProfileCardsError.propTypes = {
  networkErrors: NetworkErrorsPropType.isRequired,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
};

export default ProfileCardsError;
