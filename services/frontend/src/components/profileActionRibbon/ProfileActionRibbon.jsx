import PropTypes from "prop-types";

import ProfileActionRibbonView from "./ProfileActionRibbonView";

const ProfileActionRibbon = ({
  children,
  connectionStatus,
  loggedInUserId,
  userId,
}) => (
  <ProfileActionRibbonView
    connectionStatus={connectionStatus}
    loggedInUserId={loggedInUserId}
    userId={userId}
  >
    {children}
  </ProfileActionRibbonView>
);

ProfileActionRibbon.propTypes = {
  children: PropTypes.element,
  connectionStatus: PropTypes.bool.isRequired,
  loggedInUserId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

ProfileActionRibbon.defaultProps = {
  children: null,
};

export default ProfileActionRibbon;
