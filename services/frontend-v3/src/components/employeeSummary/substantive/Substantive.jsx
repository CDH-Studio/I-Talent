import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import SubstativeView from "./SubstantiveView";

const Substantive = ({ data }) => {
  const formatData = () => {
    const classification = {
      title: <FormattedMessage id="profile.classification" />,
      description: data.groupLevel ? data.groupLevel.name : "-",
    };

    const security = {
      title: <FormattedMessage id="profile.security" />,
      description: data.securityClearance
        ? data.securityClearance.description
        : "-",
    };

    let substantiveDescription = "-";

    if (data.tenure && data.tenure.description) {
      substantiveDescription = data.tenure.description;
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
    groupLevel: PropTypes.shape({
      name: PropTypes.string,
    }),
    tenure: PropTypes.shape({
      description: PropTypes.string,
    }),
    indeterminate: PropTypes.bool,
    securityClearance: PropTypes.shape({
      description: PropTypes.string,
    }),
  }).isRequired,
};

export default Substantive;
