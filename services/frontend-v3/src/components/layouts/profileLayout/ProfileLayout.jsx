import React from "react";
import PropTypes from "prop-types";
import ProfileLayoutView from "./ProfileLayoutView";

const ProfileLayout = ({ data, displaySideBar, changeLanguage }) => {
  return (
    <ProfileLayoutView
      changeLanguage={changeLanguage}
      displaySideBar={displaySideBar}
      data={data}
    />
  );
};

ProfileLayout.propTypes = {
  data: PropTypes.isRequired,
  displaySideBar: PropTypes.bool.isRequired,
  changeLanguage: PropTypes.func.isRequired,
};

export default ProfileLayout;
