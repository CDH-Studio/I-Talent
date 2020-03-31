import React, { Component } from "react";
import { injectIntl } from "react-intl";

import DevelopmentalGoalsView from "./DevelopmentalGoalsView";

function DevelopmentalGoals(props) {
  const formatData = dataSource => {
    const data = dataSource.data;
    const locale = dataSource.intl.formatMessage({ id: "language.code" });

    let devGoals = {};
    let key = 0;

    data.developmentalGoals.forEach(devGoal => {
      devGoals[key] = devGoal.description[locale];
      key++;
    });

    return devGoals;
  };

  return <DevelopmentalGoalsView devGoals={formatData(props)} />;
}

export default injectIntl(DevelopmentalGoals);
