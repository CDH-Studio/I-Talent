import React, { Component } from "react";
import DashboardGraphsView from "./DashboardGraphsView";
import { injectIntl } from "react-intl";

class DashboardGraphs extends Component {
  changeEnFr(data) {
    const locale = this.props.intl.formatMessage({ id: "language.code" });

    data = data.map(skill => {
      return {
        name: skill.description[locale],
        count: skill.count
      };
    });

    return data;
  }

  render() {
    const { data } = this.props;

    return (
      <DashboardGraphsView
        topFiveSkills={this.changeEnFr(data.skillCount)}
        topFiveCompetencies={this.changeEnFr(data.compCount)}
        topFiveDevelopmentGoals={this.changeEnFr(data.developCount)}
        monthlyGrowth={data.graphicalData}
      />
    );
  }
}

export default injectIntl(DashboardGraphsView);
