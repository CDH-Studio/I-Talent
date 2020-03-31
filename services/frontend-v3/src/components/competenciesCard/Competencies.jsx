import React, { Component } from "react";
import { injectIntl } from "react-intl";

import CompetenciesView from "./CompetenciesView";

function Competencies(props) {
  const formatData = dataSource => {
    const data = dataSource.data;
    const locale = dataSource.intl.formatMessage({ id: "language.code" });

    let competencies = {};
    let key = 0;

    data.competencies.forEach(element => {
      competencies[key] = element.description[locale];
      key++;
    });

    return competencies;
  };

  return <CompetenciesView competencies={formatData(props)} />;
}

export default injectIntl(Competencies);
