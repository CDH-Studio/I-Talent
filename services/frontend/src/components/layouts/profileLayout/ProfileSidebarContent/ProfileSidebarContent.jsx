import PropTypes from "prop-types";

import ProfileSidebarContentView from "./ProfileSidebarContentView";

const ProfileSidebarContent = ({ isOwnersProfile }) => (
  <ProfileSidebarContentView isOwnersProfile={isOwnersProfile} />
);

ProfileSidebarContent.propTypes = {
  isOwnersProfile: PropTypes.bool,
};

ProfileSidebarContent.defaultProps = {
  isOwnersProfile: false,
};

export default ProfileSidebarContent;
