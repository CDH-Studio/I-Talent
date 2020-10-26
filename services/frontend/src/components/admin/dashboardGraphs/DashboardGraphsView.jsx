import React from "react";
import PropTypes from "prop-types";
import { Card, Row, Col } from "antd";
import { FormattedMessage, injectIntl } from "react-intl";
import Chart from "react-apexcharts";

import { IntlPropType } from "../../../utils/customPropTypes";

/**
 *  DashboardGraphsView(props)
 *  This component renders the graphes for the Admin Dashbord page.
 *  (1st Level) Three graphes: Popular Skills, Competencies & Development Goals
 *  (2nd Level) This graph shows the monthly growth rate for the web application
 *  Disclaimer: Please look at Bizcharts documentation for further help with graphes
 */
const DashboardGraphsView = ({
  topFiveSkills,
  topFiveCompetencies,
  topFiveDevelopmentalGoals,
  monthlyGrowth,
  intl,
}) => {
  const popularSkillsColumns = {
    options: {
      xaxis: {
        categories: topFiveSkills.map((element) => element.name),
      },
      yaxis: {
        tickAmount: 1,
      },
    },
    series: [
      {
        name: intl.formatMessage({
          id: "admin.dashboard.number.of.occurrences",
        }),
        data: topFiveSkills.map((element) => element.count),
      },
    ],
  };

  const popularCompetenciesColumns = {
    options: {
      xaxis: {
        categories: topFiveCompetencies.map((element) => element.name),
      },
      yaxis: {
        tickAmount: 1,
      },
    },
    series: [
      {
        name: intl.formatMessage({
          id: "admin.dashboard.number.of.occurrences",
        }),
        data: topFiveCompetencies.map((element) => element.count),
      },
    ],
  };

  const popularDevelopmentGoalsColumns = {
    options: {
      xaxis: {
        categories: topFiveDevelopmentalGoals.map((element) => element.name),
      },
      yaxis: {
        tickAmount: 1,
      },
    },
    series: [
      {
        name: intl.formatMessage({
          id: "admin.dashboard.number.of.occurrences",
        }),
        data: topFiveDevelopmentalGoals.map((element) => element.count),
      },
    ],
  };
  const growthRateByMonthColumns = {
    options: {
      xaxis: {
        categories: monthlyGrowth.map(
          (element) => `${element.monthName}-${element.year}`
        ),
      },
      yaxis: {
        tickAmount: 1,
      },
    },
    series: [
      {
        name: intl.formatMessage({
          id: "admin.dashboard.number.of.occurrences",
        }),
        data: monthlyGrowth.map((element) => element.count),
      },
    ],
  };

  return (
    <>
      <Row gutter={[8, 8]}>
        <Col xs={24} sm={24} md={12} xl={8}>
          <Card
            title={<FormattedMessage id="admin.dashboard.popular.skills" />}
            loading={topFiveSkills.length === 0}
          >
            <Chart
              options={popularSkillsColumns.options}
              series={popularSkillsColumns.series}
              type="bar"
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} xl={8}>
          <Card
            title={
              <FormattedMessage id="admin.dashboard.popular.competencies" />
            }
            loading={topFiveCompetencies.length === 0}
          >
            <Chart
              options={popularCompetenciesColumns.options}
              series={popularCompetenciesColumns.series}
              type="bar"
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} xl={8}>
          <Card
            title={
              <FormattedMessage id="admin.dashboard.popular.development.goals" />
            }
            loading={topFiveDevelopmentalGoals.length === 0}
          >
            <Chart
              options={popularDevelopmentGoalsColumns.options}
              series={popularDevelopmentGoalsColumns.series}
              type="bar"
            />
          </Card>
        </Col>
        {monthlyGrowth && (
          <Col span={24} md={12} xl={24}>
            <Card
              title={
                <FormattedMessage id="admin.dashboard.growth.rate.by.month" />
              }
              loading={monthlyGrowth.length === 0}
            >
              <Chart
                options={growthRateByMonthColumns.options}
                series={growthRateByMonthColumns.series}
                type="line"
                autoFit
              />
            </Card>
          </Col>
        )}
      </Row>
    </>
  );
};

DashboardGraphsView.propTypes = {
  topFiveSkills: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      count: PropTypes.number,
    })
  ).isRequired,
  topFiveCompetencies: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      count: PropTypes.number,
    })
  ).isRequired,
  topFiveDevelopmentalGoals: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      count: PropTypes.number,
    })
  ).isRequired,
  monthlyGrowth: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.string,
      count: PropTypes.number,
      monthName: PropTypes.string,
    })
  ),
  intl: IntlPropType,
};

DashboardGraphsView.defaultProps = {
  intl: undefined,
  monthlyGrowth: null,
};

export default injectIntl(DashboardGraphsView);
