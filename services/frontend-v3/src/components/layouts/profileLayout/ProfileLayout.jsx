import React from "react";
import propTypes from "prop-types";
import ProfileLayoutView from "./ProfileLayoutView";

import { ProfileInfoPropType } from "../../../customPropTypes";

const ProfileLayout = ({
  data,
  connectionStatus,
  privateProfile,
  changeConnection,
  loading,
}) => {
  return (
    <ProfileLayoutView
      data={data}
      connectionStatus={connectionStatus}
      privateProfile={privateProfile}
      changeConnection={changeConnection}
      loading={loading}
    />
  );
};

ProfileLayout.propTypes = {
  data: ProfileInfoPropType,
  connectionStatus: propTypes.bool,
  privateProfile: propTypes.bool,
  changeConnection: propTypes.func,
  loading: propTypes.bool,
};

ProfileLayout.defaultProps = {
  data: null,
  connectionStatus: null,
  privateProfile: null,
  changeConnection: null,
  loading: null,
};

export default ProfileLayout;
