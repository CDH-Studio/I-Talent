import React from "react";
import { injectIntl } from "react-intl";
import CreateProfileLayout from "../components/layouts/createProfileLayout/CreateProfileLayout";

const ProfileCreate = (props) => {
  document.title = `${props.intl.formatMessage({
    id: "create.profile",
  })} | I-Talent`;

  return (
    <CreateProfileLayout
      changeLanguage={props.changeLanguage}
      keycloak={props.keycloak}
      step={props.match.params.step}
    />
  );
};

export default injectIntl(ProfileCreate);
