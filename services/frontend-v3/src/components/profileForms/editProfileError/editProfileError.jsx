import React from "react";
import PropTypes from "prop-types";
import EditProfileErrorView from "./editProfileErrorView";
import { NetworkErrorsPropType } from "../../../customPropTypes";

const EditProfileError = ({ networkErrors, customErrorTitle }) => {
  return (
    <EditProfileErrorView
      networkErrors={networkErrors}
      customErrorTitle={customErrorTitle}
    />
  );
};

EditProfileError.propTypes = {
  networkErrors: NetworkErrorsPropType.isRequired,
  customErrorTitle: PropTypes.string,
};

EditProfileError.defaultProps = {
  customErrorTitle: undefined,
};

export default EditProfileError;
