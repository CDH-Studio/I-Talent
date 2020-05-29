import React from "react";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import { IntlPropType } from "../customPropTypes";
import EditProfileLayout from "../components/layouts/editProfileLayout/EditProfileLayout";

const ProfileEdit = ({ intl, match }) => {
  document.title = `${intl.formatMessage({ id: "edit.profile" })} | I-Talent`;

  return <EditProfileLayout step={match.params.step} />;
};

ProfileEdit.propTypes = {
  intl: IntlPropType,
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.objectOf(PropTypes.any),
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

ProfileEdit.defaultProps = {
  intl: undefined,
};

export default injectIntl(ProfileEdit);
