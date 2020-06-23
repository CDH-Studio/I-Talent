import React from "react";
import PropTypes from "prop-types";

import CompetenciesView from "./CompetenciesView";

const Competencies = ({ data }) => {
  return <CompetenciesView competencies={data.competencies} />;
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
