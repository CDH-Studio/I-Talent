import React from "react";
import PropTypes from "prop-types";
import ProfileLayoutView from "./ProfileLayoutView";

import {
  ProfileInfoPropType,
  NetworkErrorsPropType,
} from "../../../customPropTypes";

const ProfileLayout = ({ data, changeLanguage, networkErrors }) => {
  return (
    <ProfileLayoutView
      changeLanguage={changeLanguage}
      data={data}
      networkErrors={networkErrors}
    />
  );
};

ProfileLayout.propTypes = {
  data: ProfileInfoPropType,
  changeLanguage: PropTypes.func.isRequired,
  networkErrors: NetworkErrorsPropType.isRequired,
};

ProfileLayout.defaultProps = {
  data: null,
};

export default ProfileLayout;
