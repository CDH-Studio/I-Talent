import propTypes from "prop-types";
import ProfileLayoutView from "./ProfileLayoutView";

import { ProfileInfoPropType } from "../../../utils/customPropTypes";

const ProfileLayout = ({
  data,
  connectionStatus,
  isUsersProfile,
  changeConnection,
  loading,
  savedFormContent,
}) => (
  <ProfileLayoutView
    data={data}
    connectionStatus={connectionStatus}
    isUsersProfile={isUsersProfile}
    changeConnection={changeConnection}
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
