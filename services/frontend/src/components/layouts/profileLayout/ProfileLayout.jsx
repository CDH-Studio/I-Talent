import React from "react";
import propTypes from "prop-types";

import { ProfileInfoPropType } from "../../../utils/customPropTypes";
import ProfileLayoutView from "./ProfileLayoutView";

const ProfileLayout = ({
  data,
  connectionStatus,
  isUsersProfile,
  isLoading,
  savedFormContent,
}) => (
  <ProfileLayoutView
    connectionStatus={connectionStatus}
    data={data}
    isLoading={isLoading}
    isUsersProfile={isUsersProfile}
    savedFormContent={savedFormContent}
  />
);

ProfileLayout.propTypes = {
  connectionStatus: propTypes.bool,
  data: ProfileInfoPropType,
  isLoading: propTypes.bool,
  isUsersProfile: propTypes.bool,
  savedFormContent: propTypes.bool,
};

ProfileLayout.defaultProps = {
  connectionStatus: null,
  data: null,
  isLoading: true,
  isUsersProfile: null,
  savedFormContent: undefined,
};

export default React.memo(ProfileLayout);
