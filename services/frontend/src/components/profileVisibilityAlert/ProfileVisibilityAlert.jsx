import { useKeycloak } from "@react-keycloak/web";
import PropTypes from "prop-types";

import ProfileVisibilityAlertView from "./ProfileVisibilityAlertView";

const ProfileVisibilityAlert = ({
  isUsersProfile,
  isProfileHidden,
  isProfileInactive,
}) => {
  const { keycloak } = useKeycloak();

  return (
    <ProfileVisibilityAlertView
      canViewHiddenProfiles={keycloak.hasResourceRole("view-private-profile")}
      isProfileHidden={isProfileHidden}
      isProfileInactive={isProfileInactive}
      isUsersProfile={isUsersProfile}
    />
  );
};

ProfileVisibilityAlert.propTypes = {
  isProfileHidden: PropTypes.bool.isRequired,
  isProfileInactive: PropTypes.bool.isRequired,
  isUsersProfile: PropTypes.bool.isRequired,
};

export default ProfileVisibilityAlert;
