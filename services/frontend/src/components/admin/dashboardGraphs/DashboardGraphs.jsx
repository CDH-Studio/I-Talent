import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import DashboardGraphsView from "./DashboardGraphsView";

/**
 *  DashboardGraphs(props)
 *  Controller for the DashboardGraphsView.
 *  It setups the data (bridge) for rendering the component in the view.
 */
const DashboardGraphs = () => {
  const [graphicalData, setGraphicalData] = useState();

  const { topFive, growthRate } = useSelector((state) => state.stats);

  // Formats the data for the monthly growth rate graph
  useEffect(() => {
    if (growthRate.month.growthRate) {
      const rate = growthRate.month.growthRate;
      const data = [];

      const shortMonthNames = dayjs.monthsShort();

      Object.keys(rate).forEach((year) => {
        Object.keys(rate[year]).forEach((month) => {
          data.push({
            count: rate[year][month],
            monthName: shortMonthNames[month],
            year,
          });
        });
      });

      setGraphicalData(data);
    }
  }, [growthRate]);

  return (
    <DashboardGraphsView
      monthlyGrowth={graphicalData}
      topFiveCompetencies={topFive.competencies}
      topFiveDevelopmentalGoals={topFive.developmentalGoals}
      topFiveSkills={topFive.skills}
    />
  );
};

export default DashboardGraphs;
