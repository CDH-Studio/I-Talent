import React from "react";
import { injectIntl } from "react-intl";
import { IntlPropType, ProfileInfoPropType } from "../../customPropTypes";

import DevelopmentalGoalsView from "./DevelopmentalGoalsView";

function DevelopmentalGoals({ data, intl }) {
  const formatData = dataSource => {
    const profileData = { ...dataSource.data };
    const locale = dataSource.intl.formatMessage({ id: "language.code" });

    const devGoals = [];
    let key = 0;

    if (profileData.developmentalGoals) {
      profileData.developmentalGoals.forEach(devGoal => {
        devGoals[key] = devGoal.description[locale];
        key += 1;
      });
    }

    return devGoals;
  };

  return <DevelopmentalGoalsView devGoals={formatData({ data, intl })} />;
}

DevelopmentalGoals.propTypes = {
  data: ProfileInfoPropType,
  intl: IntlPropType,
};

DevelopmentalGoals.defaultProps = {
  data: null,
  intl: undefined,
};

export default injectIntl(DevelopmentalGoals);
