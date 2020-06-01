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

    let substantiveDescription = <FormattedMessage id="profile.term" />;

    if (
      data.temporaryRole.description &&
      data.temporaryRole.description[locale]
    ) {
      substantiveDescription = data.temporaryRole.description[locale];
    }

    const substative = {
      title: <FormattedMessage id="profile.substantive" />,
      description: substantiveDescription,
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
    temporaryRole: PropTypes.shape({
      description: PropTypes.shape({
        en: PropTypes.string,
        fr: PropTypes.string,
      }),
    }),
    security: PropTypes.shape({
      description: PropTypes.shape({
        en: PropTypes.string,
        fr: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default Substantive;
