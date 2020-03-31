import React, { Component } from "react";
import DashboardGraphsView from "./DashboardGraphsView";
import { injectIntl } from "react-intl";

function DashboardGraphs(props) {
  const changeEnFr = dataSource => {
    const locale = localStorage.getItem("lang");
    const data = dataSource.map(skill => {
      return {
        name: skill.description[locale],
        count: skill.count
      };
    });

    return data;
  };
  return (
    <DashboardGraphsView
      topFiveSkills={changeEnFr(props.data.skillCount)}
      topFiveCompetencies={changeEnFr(props.data.compCount)}
      topFiveDevelopmentGoals={changeEnFr(props.data.developCount)}
      monthlyGrowth={props.data.graphicalData}
    />
  );
}

export default injectIntl(DashboardGraphs);
