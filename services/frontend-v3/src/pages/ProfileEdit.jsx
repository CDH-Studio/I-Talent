import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import EditProfileLayout from "../components/layouts/editProfileLayout/EditProfileLayout";

const ProfileEdit = ({ match }) => {
  const intl = useIntl();

  useEffect(() => {
    document.title = `${intl.formatMessage({ id: "edit.profile" })} | I-Talent`;
  }, [intl]);

  return <EditProfileLayout step={match.params.step} />;
};

ProfileEdit.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.objectOf(PropTypes.any),
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default ProfileEdit;
