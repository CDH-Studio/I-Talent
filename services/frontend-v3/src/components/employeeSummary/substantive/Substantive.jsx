import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import SubstativeView from "./SubstantiveView";

const Substantive = ({ data }) => {
  const { locale } = useSelector((state) => state.settings);

  const formatData = () => {
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
};

export default Substantive;
