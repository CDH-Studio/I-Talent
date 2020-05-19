/* eslint-disable no-shadow */
import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import DashboardGraphsView from "./DashboardGraphsView";

/**
 *  DashboardGraphs(props)
 *  Controller for the DashboardGraphsView.
 *  It setups the data (bridge) for rendering the component in the view.
 */
const DashboardGraphs = ({ data }) => {
  const locale = useSelector((state) => state.settings.language);

  /* only access data for graphes that uses corresponding language on page */
  const changeEnFr = (dataSource) => {
    if (dataSource) {
      const data = dataSource.map((skill) => {
        return {
          name: skill.description[locale],
          count: skill.count,
        };
      });

      return data;
    }
    return [];
  };

  return (
    <DashboardGraphsView
      topFiveSkills={changeEnFr(data.skillCount)}
      topFiveCompetencies={changeEnFr(data.compCount)}
      topFiveDevelopmentGoals={changeEnFr(data.developCount)}
      monthlyGrowth={data.graphicalData}
    />
  );
};

DashboardGraphs.propTypes = {
  data: PropTypes.shape({
    skillCount: PropTypes.isRequired,
    compCount: PropTypes.isRequired,
    developCount: PropTypes.isRequired,
    graphicalData: PropTypes.isRequired,
  }).isRequired,
};

export default DashboardGraphs;
