import React from "react";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import EditProfileLayout from "../components/layouts/editProfileLayout/EditProfileLayout";

const ProfileEdit = ({ changeLanguage, intl, match }) => {
  document.title = `${intl.formatMessage({ id: "edit.profile" })} | I-Talent`;

  return (
    <EditProfileLayout
      changeLanguage={changeLanguage}
      step={match.params.step}
    />
  );
};

ProfileEdit.propTypes = {
  intl: PropTypes.isRequired,
  changeLanguage: PropTypes.func.isRequired,
  match: PropTypes.isRequired,
};

export default injectIntl(ProfileEdit);
