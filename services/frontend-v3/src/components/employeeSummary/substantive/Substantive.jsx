import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage, injectIntl } from "react-intl";
import SubstativeView from "./SubstantiveView";

const Substantive = ({ intl, data }) => {
  const formatData = () => {
    const locale = intl.formatMessage({ id: "language.code" });

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
        data.indeterminate === true ? (
          <FormattedMessage id="profile.indeterminate" />
        ) : (
          <FormattedMessage id="profile.term" />
        ),
    };

    return [substative, classification, security];
  };

  return <SubstativeView values={formatData()} />;
};

Substantive.propTypes = {
  data: PropTypes.shape({
    classification: PropTypes.shape({
      description: PropTypes.any,
    }),
    indeterminate: PropTypes.bool,
    security: PropTypes.shape({
      description: PropTypes.shape({
        en: PropTypes.string,
        fr: PropTypes.string,
      }),
    }),
  }).isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }).isRequired,
};

export default injectIntl(Substantive);
