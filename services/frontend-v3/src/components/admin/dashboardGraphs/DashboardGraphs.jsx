import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import moment from "moment";
// import DashboardGraphsView from "./DashboardGraphsView";

// /**
//  *  DashboardGraphs(props)
//  *  Controller for the DashboardGraphsView.
//  *  It setups the data (bridge) for rendering the component in the view.
//  */
// const DashboardGraphs = () => {
//   const [graphicalData, setGraphicalData] = useState();

//   const { topFive, growthRate } = useSelector((state) => state.stats);

//   // Formats the data for the monthly growth rate graph
//   useEffect(() => {
//     if (growthRate.month.growthRate) {
//       const rate = growthRate.month.growthRate;
//       const data = [];

//       const shortMonthNames = moment.monthsShort();

//       Object.keys(rate).forEach((year) => {
//         Object.keys(rate[year]).forEach((month) => {
//           data.push({
//             year,
//             monthName: shortMonthNames[month],
//             count: rate[year][month],
//           });
//         });
//       });

//       setGraphicalData(data);
//     }
//   }, [growthRate]);

//   return (
//     <DashboardGraphsView
//       topFiveSkills={topFive.skills}
//       topFiveCompetencies={topFive.competencies}
//       topFiveDevelopmentalGoals={topFive.developmentalGoals}
//       monthlyGrowth={graphicalData}
//     />
//   );
// };

export default () => {return null};
