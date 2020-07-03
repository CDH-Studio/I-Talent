import React from "react";
import { ProfileInfoPropType } from "../../customPropTypes";

import DevelopmentalGoalsView from "./DevelopmentalGoalsView";

const DevelopmentalGoals = ({ data }) => {
  return <DevelopmentalGoalsView devGoals={data.developmentalGoals} />;
};

DevelopmentalGoals.propTypes = {
  data: ProfileInfoPropType,
};

DevelopmentalGoals.defaultProps = {
  data: null,
};

export default DevelopmentalGoals;
