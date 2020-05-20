import React from "react";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import CreateProfileLayout from "../components/layouts/createProfileLayout/CreateProfileLayout";
import { IntlPropType } from "../customPropTypes";

const ProfileCreate = ({ intl, match }) => {
  document.title = `${intl.formatMessage({ id: "create.profile" })} | I-Talent`;

  return <CreateProfileLayout step={match.params.step} />;
};

ProfileCreate.propTypes = {
  intl: IntlPropType,
  match: PropTypes.shape({
    params: PropTypes.shape({
      step: PropTypes.any,
    }),
  }),
};

ProfileCreate.defaultProps = {
  intl: undefined,
  match: {
    params: undefined,
  },
};

export default injectIntl(ProfileCreate);
