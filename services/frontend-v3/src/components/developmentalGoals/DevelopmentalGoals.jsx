import React from "react";
import { useSelector } from "react-redux";
import { ProfileInfoPropType } from "../../customPropTypes";

import DevelopmentalGoalsView from "./DevelopmentalGoalsView";

const DevelopmentalGoals = ({ data }) => {
  const { locale } = useSelector((state) => state.settings);

  const formatData = (dataSource) => {
    const profileData = { ...dataSource };

    const devGoals = [];
    let key = 0;

    if (profileData.developmentalGoals) {
      profileData.developmentalGoals.forEach((devGoal) => {
        devGoals[key] = devGoal.description[locale];
        key += 1;
      });
    }

    return devGoals;
  };

  return <DevelopmentalGoalsView devGoals={formatData(data)} />;
};

DevelopmentalGoals.propTypes = {
  data: ProfileInfoPropType,
};

DevelopmentalGoals.defaultProps = {
  data: null,
};

export default DevelopmentalGoals;
