import React from "react";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import CreateProfileLayout from "../components/layouts/createProfileLayout/CreateProfileLayout";

const ProfileCreate = ({ intl, changeLanguage, match }) => {
  document.title = `${intl.formatMessage({ id: "create.profile" })} | I-Talent`;

  return (
    <CreateProfileLayout
      changeLanguage={changeLanguage}
      step={match.params.step}
    />
  );
};

ProfileCreate.propTypes = {
  intl: PropTypes.isRequired,
  changeLanguage: PropTypes.func.isRequired,
  match: PropTypes.isRequired,
};

export default injectIntl(ProfileCreate);
