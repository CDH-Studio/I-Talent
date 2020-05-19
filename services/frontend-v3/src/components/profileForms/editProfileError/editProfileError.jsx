import React from "react";
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
};

export default EditProfileError;
