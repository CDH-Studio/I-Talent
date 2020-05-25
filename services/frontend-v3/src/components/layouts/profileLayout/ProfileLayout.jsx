import React from "react";
import ProfileLayoutView from "./ProfileLayoutView";

import { ProfileInfoPropType } from "../../../customPropTypes";

const ProfileLayout = ({ data, history }) => {
  return <ProfileLayoutView data={data} history={history} />;
};

ProfileLayout.propTypes = {
  data: ProfileInfoPropType,
};

ProfileLayout.defaultProps = {
  data: null,
};

export default ProfileLayout;
