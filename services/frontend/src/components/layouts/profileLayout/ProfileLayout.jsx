import propTypes from "prop-types";

import { ProfileInfoPropType } from "../../../utils/customPropTypes";
import ProfileLayoutView from "./ProfileLayoutView";

const ProfileLayout = ({
  data,
  connectionStatus,
  isUsersProfile,
  changeConnection,
  loading,
  savedFormContent,
}) => (
  <ProfileLayoutView
    changeConnection={changeConnection}
    connectionStatus={connectionStatus}
    data={data}
    isUsersProfile={isUsersProfile}
    loading={loading}
    savedFormContent={savedFormContent}
  />
);

ProfileLayout.propTypes = {
  data: ProfileInfoPropType,
  connectionStatus: propTypes.bool,
  isUsersProfile: propTypes.bool,
  changeConnection: propTypes.func,
  loading: propTypes.bool,
  savedFormContent: propTypes.bool,
};

ProfileLayout.defaultProps = {
  data: null,
  connectionStatus: null,
  isUsersProfile: null,
  changeConnection: null,
  loading: null,
  savedFormContent: undefined,
};

export default ProfileLayout;
