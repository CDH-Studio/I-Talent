import React from "react";
import EditProfileHeaderView from "./EditProfileHeaderView";

const EditProfileHeader = (props) => {
  return <EditProfileHeaderView returnToProfile={props.returnToProfile} />;
};

export default EditProfileHeader;
