import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import CompetenciesView from "./CompetenciesView";

const Competencies = ({ data, intl }) => {
  const formatData = () => {
    const locale = intl.formatMessage({ id: "language.code" });

    const competencies = [];
    let key = 0;

    if (data.competencies) {
      data.competencies.forEach(element => {
        competencies[key] = element.description[locale];
        key += 1;
      });
    }

    return competencies;
  };
  return <CompetenciesView competencies={formatData()} />;
};

Competencies.propTypes = {
  data: PropTypes.shape({
    competencies: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.shape({
          en: PropTypes.string,
          fr: PropTypes.string,
        }),
        id: PropTypes.string,
      })
    ),
  }).isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }).isRequired,
};

export default injectIntl(Competencies);
