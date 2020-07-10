import React from "react";
import PropTypes from "prop-types";
import ProfileLayoutView from "./ProfileLayoutView";

import { ProfileInfoPropType } from "../../../customPropTypes";

const ProfileLayout = ({ data, loading }) => {
  return <ProfileLayoutView data={data} loading={loading} />;
};

ProfileLayout.propTypes = {
  data: ProfileInfoPropType,
  loading: PropTypes.bool,
};

ProfileLayout.defaultProps = {
  data: null,
  loading: null,
};

export default ProfileLayout;
