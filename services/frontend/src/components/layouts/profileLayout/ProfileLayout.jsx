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
  changeConnection: propTypes.func,
  connectionStatus: propTypes.bool,
  data: ProfileInfoPropType,
  isUsersProfile: propTypes.bool,
  loading: propTypes.bool,
  savedFormContent: propTypes.bool,
};

ProfileLayout.defaultProps = {
  changeConnection: null,
  connectionStatus: null,
  data: null,
  isUsersProfile: null,
  loading: null,
  savedFormContent: undefined,
};

export default ProfileLayout;
