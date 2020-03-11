import React, { Component } from "react";
import DashboardGraphesView from "./DashboardGraphesView";
import { injectIntl } from "react-intl";

class DashboardGraphes extends Component {
  topFiveSkills(data) {
    const locale = this.props.intl.formatMessage({ id: "language.code" });

    // Skills Count:
    let topFiveSkills = data;
    topFiveSkills = topFiveSkills.map(skill => {
      return {
        name: skill.description[locale],
        count: skill.count
      };
    });

    return topFiveSkills;
  }

  topFiveCompetencies(data) {
    const locale = this.props.intl.formatMessage({ id: "language.code" });

    // Competencies Count:
    let topFiveCompetencies = data;
    topFiveCompetencies = topFiveCompetencies.map(comp => {
      return {
        name: comp.description[locale],
        count: comp.count
      };
    });

    return topFiveCompetencies;
  }

  topFiveDevelopmentGoals(data) {
    const locale = this.props.intl.formatMessage({ id: "language.code" });

    // Development Goals Count:
    let topFiveDevelopmentGoals = data;
    topFiveDevelopmentGoals = topFiveDevelopmentGoals.map(goal => {
      return {
        name: goal.description[locale],
        count: goal.count
      };
    });

    return topFiveDevelopmentGoals;
  }

  monthlyGrowth(data) {
    const graphicalData = data.graphicalData;
    return graphicalData;
  }

  render() {
    const { data } = this.props;

    return (
      <DashboardGraphesView
        topFiveSkills={this.topFiveSkills(data.skillCount)}
        topFiveCompetencies={this.topFiveCompetencies(data.compCount)}
        topFiveDevelopmentGoals={this.topFiveDevelopmentGoals(
          data.developCount
        )}
        monthlyGrowth={this.monthlyGrowth(data.growthRateByMonth)}
      />
    );
  }
}

export default injectIntl(DashboardGraphesView);
