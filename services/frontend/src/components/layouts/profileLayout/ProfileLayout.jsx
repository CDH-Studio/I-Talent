import React from "react";
import propTypes from "prop-types";

import { ProfileInfoPropType } from "../../../utils/customPropTypes";
import ProfileLayoutView from "./ProfileLayoutView";

const ProfileLayout = ({
  data,
  connectionStatus,
  isUsersProfile,
  loading,
  savedFormContent,
}) => (
  <ProfileLayoutView
    connectionStatus={connectionStatus}
    data={data}
    isUsersProfile={isUsersProfile}
    loading={loading}
    savedFormContent={savedFormContent}
  />
);

ProfileLayout.propTypes = {
  connectionStatus: propTypes.bool,
  data: ProfileInfoPropType,
  isUsersProfile: propTypes.bool,
  loading: propTypes.bool,
  savedFormContent: propTypes.bool,
};

ProfileLayout.defaultProps = {
  connectionStatus: null,
  data: null,
  isUsersProfile: null,
  loading: null,
  savedFormContent: undefined,
};

export default React.memo(ProfileLayout);
