import React from "react";
import PropTypes from "prop-types";
import ProfileLayoutView from "./ProfileLayoutView";

import { ProfileInfoPropType } from "../../../customPropTypes";

const ProfileLayout = ({ data, changeLanguage }) => {
  return <ProfileLayoutView changeLanguage={changeLanguage} data={data} />;
};

ProfileLayout.propTypes = {
  data: ProfileInfoPropType,
  changeLanguage: PropTypes.func.isRequired,
};

ProfileLayout.defaultProps = {
  data: null,
};

export default ProfileLayout;
