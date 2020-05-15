import React from "react";
import EditProfileErrorView from "./editProfileErrorView";

const EditProfileError = ({ networkError }) => {
  return <EditProfileErrorView networkError={networkError} />;
};

export default EditProfileError;
