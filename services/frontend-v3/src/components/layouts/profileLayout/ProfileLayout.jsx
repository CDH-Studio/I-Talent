import React from "react";
import ProfileLayoutView from "./ProfileLayoutView";

import { ProfileInfoPropType } from "../../../customPropTypes";

const ProfileLayout = ({ data }) => {
  return <ProfileLayoutView data={data} />;
};

ProfileLayout.propTypes = {
  data: ProfileInfoPropType,
};

ProfileLayout.defaultProps = {
  data: null,
};

export default ProfileLayout;
