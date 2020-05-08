import React from "react";
import { injectIntl } from "react-intl";

import DevelopmentalGoalsView from "./DevelopmentalGoalsView";

function DevelopmentalGoals(props) {
  const formatData = (dataSource) => {
    const { data } = dataSource;
    const locale = dataSource.intl.formatMessage({ id: "language.code" });

    const devGoals = [];
    let key = 0;

    if (data.developmentalGoals) {
      data.developmentalGoals.forEach((devGoal) => {
        devGoals[key] = devGoal.description[locale];
        key++;
      });
    }

    return devGoals;
  };

  return <DevelopmentalGoalsView devGoals={formatData(props)} />;
}

export default injectIntl(DevelopmentalGoals);
