// import React from "react";
// import PropTypes from "prop-types";
// import { Card, Row, Col } from "antd";
// import { Chart, Geom, Axis, Tooltip, Coord, Legend } from "bizcharts";
// import { FormattedMessage, injectIntl } from "react-intl";
// import { IntlPropType } from "../../../utils/customPropTypes";

// /**
//  *  DashboardGraphsView(props)
//  *  This component renders the graphes for the Admin Dashbord page.
//  *  (1st Level) Three graphes: Popular Skills, Competencies & Development Goals
//  *  (2nd Level) This graph shows the monthly growth rate for the web application
//  *  Disclaimer: Please look at Bizcharts documentation for further help with graphes
//  */
// const DashboardGraphsView = ({
//   topFiveSkills,
//   topFiveCompetencies,
//   topFiveDevelopmentalGoals,
//   monthlyGrowth,
//   intl,
// }) => {
//   const popularSkillsColumns = {
//     count: {
//       alias: intl.formatMessage({
//         id: "admin.dashboard.number.of.occurrences",
//       }),
//       tickInterval: 1,
//     },
//   };

//   const popularCompetenciesColumns = {
//     count: {
//       alias: intl.formatMessage({
//         id: "admin.dashboard.number.of.occurrences",
//       }),
//       tickInterval: 1,
//     },
//   };

//   const popularDevelopmentGoalsColumns = {
//     count: {
//       alias: intl.formatMessage({
//         id: "admin.dashboard.number.of.occurrences",
//       }),
//       tickInterval: 1,
//     },
//   };

//   const growthRateByMonthColumns = {
//     monthName: { range: [0, 1] },
//     count: {
//       alias: intl.formatMessage({
//         id: "admin.dashboard.number.of.occurrences",
//       }),
//     },
//   };

//   return (
//     <>
//       <Row gutter={[8, 8]}>
//         <Col span={8}>
//           <Card
//             title={<FormattedMessage id="admin.dashboard.popular.skills" />}
//             loading={topFiveSkills.length === 0}
//           >
//             <Chart
//               data={topFiveSkills}
//               scale={popularSkillsColumns}
//               padding="auto"
//               forceFit
//             >
//               <Axis name="name" visible={false} />
//               <Axis name="count" title />
//               <Coord scale={[0.7, 0.9]} />
//               <Legend position="top" dy={-20} textStyle={{ fontSize: "12" }} />
//               <Tooltip />
//               <Geom type="interval" position="name*count" color="name" />
//             </Chart>
//           </Card>
//         </Col>
//         <Col span={8}>
//           <Card
//             title={
//               <FormattedMessage id="admin.dashboard.popular.competencies" />
//             }
//             loading={topFiveCompetencies.length === 0}
//           >
//             <Chart
//               data={topFiveCompetencies}
//               scale={popularCompetenciesColumns}
//               padding="auto"
//               forceFit
//             >
//               <Axis name="name" visible={false} />
//               <Axis name="count" title />
//               <Coord scale={[0.7, 0.9]} />
//               <Legend position="top" dy={-20} textStyle={{ fontSize: "12" }} />
//               <Tooltip />
//               <Geom type="interval" position="name*count" color="name" />
//             </Chart>
//           </Card>
//         </Col>
//         <Col span={8}>
//           <Card
//             title={
//               <FormattedMessage id="admin.dashboard.popular.development.goals" />
//             }
//             loading={topFiveDevelopmentalGoals.length === 0}
//           >
//             <Chart
//               data={topFiveDevelopmentalGoals}
//               scale={popularDevelopmentGoalsColumns}
//               padding="auto"
//               forceFit
//             >
//               <Axis name="name" visible={false} />
//               <Axis name="count" title />
//               <Coord scale={[0.7, 0.9]} />
//               <Legend position="top" dy={-20} textStyle={{ fontSize: "12" }} />
//               <Tooltip />
//               <Geom type="interval" position="name*count" color="name" />
//             </Chart>
//           </Card>
//         </Col>
//       </Row>
//       {monthlyGrowth && (
//         <Row gutter={[8, 8]}>
//           <Col span={24}>
//             <Card
//               title={
//                 <FormattedMessage id="admin.dashboard.growth.rate.by.month" />
//               }
//               loading={monthlyGrowth.length === 0}
//             >
//               <Chart
//                 data={monthlyGrowth}
//                 scale={growthRateByMonthColumns}
//                 padding="auto"
//                 forceFit
//               >
//                 <Legend />
//                 <Axis name="monthName" />
//                 <Axis name="count" />
//                 <Tooltip crosshairs={{ type: "y" }} />
//                 <Geom
//                   type="line"
//                   position="monthName*count"
//                   size={2}
//                   color="year"
//                 />
//                 <Geom
//                   type="point"
//                   position="monthName*count"
//                   size={4}
//                   shape="circle"
//                   color="year"
//                   style={{
//                     stroke: "#fff",
//                     lineWidth: 1,
//                   }}
//                 />
//               </Chart>
//             </Card>
//           </Col>
//         </Row>
//       )}
//     </>
//   );
// };

// DashboardGraphsView.propTypes = {
//   topFiveSkills: PropTypes.arrayOf(
//     PropTypes.shape({
//       name: PropTypes.string,
//       count: PropTypes.number,
//     })
//   ).isRequired,
//   topFiveCompetencies: PropTypes.arrayOf(
//     PropTypes.shape({
//       name: PropTypes.string,
//       count: PropTypes.number,
//     })
//   ).isRequired,
//   topFiveDevelopmentalGoals: PropTypes.arrayOf(
//     PropTypes.shape({
//       name: PropTypes.string,
//       count: PropTypes.number,
//     })
//   ).isRequired,
//   monthlyGrowth: PropTypes.arrayOf(
//     PropTypes.shape({
//       year: PropTypes.string,
//       count: PropTypes.number,
//       monthName: PropTypes.string,
//     })
//   ),
//   intl: IntlPropType,
// };

// DashboardGraphsView.defaultProps = {
//   intl: undefined,
//   monthlyGrowth: null,
// };

// export default injectIntl(DashboardGraphsView);
