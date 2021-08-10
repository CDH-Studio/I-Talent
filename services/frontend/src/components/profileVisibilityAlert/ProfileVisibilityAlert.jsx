import PropTypes from "prop-types";
import { useKeycloak } from "@react-keycloak/web";
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
      isUsersProfile={isUsersProfile}
      isProfileHidden={isProfileHidden}
      isProfileInactive={isProfileInactive}
    />
  );
};

ProfileVisibilityAlert.propTypes = {
  isUsersProfile: PropTypes.bool.isRequired,
  isProfileHidden: PropTypes.bool.isRequired,
  isProfileInactive: PropTypes.bool.isRequired,
};

export default ProfileVisibilityAlert;
