import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import CompetenciesView from "./CompetenciesView";

const Competencies = ({ data }) => {
  const { locale } = useSelector(state => state.settings);

  const formatData = () => {
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
};

export default Competencies;
