import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";

const ProfileNotFoundView = () => {
  return <FormattedMessage id="profile.not.found" />;
};

export default injectIntl(ProfileNotFoundView);
