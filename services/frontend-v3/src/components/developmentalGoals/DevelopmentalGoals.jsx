import React, { Component } from "react";
import { injectIntl } from "react-intl";

import DevelopmentalGoalsView from "./DevelopmentalGoalsView";

class DevelopmentalGoals extends Component {
  formatData() {
    const { data } = this.props;
    const locale = this.props.intl.formatMessage({ id: "language.code" });

    let devGoals = {};
    let key = 0;

    data.developmentalGoals.forEach(devGoal => {
      devGoals[key] = devGoal.description[locale];
      key++;
    });

    return devGoals;
  }

  render() {
    return <DevelopmentalGoalsView devGoals={this.formatData()} />;
  }
}

export default injectIntl(DevelopmentalGoals);
