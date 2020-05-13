import React from "react";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import { IntlPropType } from "../customPropTypes";
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
  intl: IntlPropType,
  changeLanguage: PropTypes.func.isRequired,
  match: PropTypes.isRequired,
};

ProfileEdit.defaultProps = {
  intl: undefined,
};

export default injectIntl(ProfileEdit);
