import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import SubstativeView from "./SubstantiveView";

function Substantive(props) {
  const formatData = (data) => {
    const locale = props.intl.formatMessage({ id: "language.code" });

    const classification = {
      title: <FormattedMessage id="profile.classification" />,
      description:
        data.classification &&
        (data.classification.description || (
          <FormattedMessage id="profile.not.specified" />
        )),
    };

    const security = {
      title: <FormattedMessage id="profile.security" />,
      description:
        data.security &&
        (data.security.description[locale] || (
          <FormattedMessage id="profile.not.specified" />
        )),
    };

    const substative = {
      title: <FormattedMessage id="profile.substantive" />,
      description:
        data.inderterminate === true ? (
          <FormattedMessage id="profile.indeterminate" />
        ) : (
          <FormattedMessage id="profile.term" />
        ),
    };

    return [substative, classification, security];
  };

  return <SubstativeView values={formatData(props.data)} />;
}

export default injectIntl(Substantive);
