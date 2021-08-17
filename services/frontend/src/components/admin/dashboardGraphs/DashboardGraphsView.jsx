import Chart from "react-chartjs-2";
import { FormattedMessage, injectIntl } from "react-intl";
import { Card, Col, Row } from "antd";
import PropTypes from "prop-types";

import { IntlPropType } from "../../../utils/customPropTypes";

const chartColors = ["#6295f9", "#60daac", "#657799", "#f6c02a", "#e96c5c"];
const graphHeight = 500;

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
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: { display: false },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: intl.formatMessage({
              id: "dashboard.number.of.occurrences",
            }),
          },
          ticks: {
            beginAtZero: true,
            stepSize: 1,
          },
        },
      ],
    },
  };

  const barGraphData = (data, type) => ({
    datasets: data
      ? data.map((element, index) => ({
          backgroundColor: chartColors[index],
          barPercentage: 0.8,
          data: [element.count],
          label: element.name,
        }))
      : [],
    labels: [intl.formatMessage({ id: `dashboard.popular.${type}` })],
  });

  const monthlyGrowthData = {
    datasets: [
      {
        backgroundColor: "rgb(8, 116, 114)",
        data: monthlyGrowth
          ? monthlyGrowth.map((element) => element.count)
          : [],
        label: intl.formatMessage({
          id: "dashboard.number.of.occurrences",
        }),
      },
    ],
    labels: monthlyGrowth
      ? monthlyGrowth.map((element) => `${element.monthName} - ${element.year}`)
      : [],
  };

  return (
    <>
      <Row gutter={[15, 15]}>
        <Col md={12} sm={24} xl={8} xs={24}>
          <Card
            bodyStyle={{ height: graphHeight }}
            loading={topFiveSkills.length === 0}
            title={<FormattedMessage id="dashboard.popular.skills" />}
          >
            <Chart
              data={barGraphData(topFiveSkills, "skills")}
              options={options}
              type="bar"
            />
          </Card>
        </Col>
        <Col md={12} sm={24} xl={8} xs={24}>
          <Card
            bodyStyle={{ height: graphHeight }}
            loading={topFiveCompetencies.length === 0}
            title={<FormattedMessage id="dashboard.popular.competencies" />}
          >
            <Chart
              data={barGraphData(topFiveCompetencies, "competencies")}
              options={options}
              type="bar"
            />
          </Card>
        </Col>
        <Col md={12} sm={24} xl={8} xs={24}>
          <Card
            bodyStyle={{ height: graphHeight }}
            loading={topFiveDevelopmentalGoals.length === 0}
            title={
              <FormattedMessage id="dashboard.popular.development.goals" />
            }
          >
            <Chart
              data={barGraphData(
                topFiveDevelopmentalGoals,
                "development.goals"
              )}
              options={options}
              type="bar"
            />
          </Card>
        </Col>
        {monthlyGrowth && (
          <Col md={12} span={24} xl={24}>
            <Card
              bodyStyle={{ height: graphHeight }}
              loading={monthlyGrowth.length === 0}
              title={<FormattedMessage id="growth.rate.by.month" />}
            >
              <Chart data={monthlyGrowthData} options={options} type="line" />
            </Card>
          </Col>
        )}
      </Row>
    </>
  );
};

DashboardGraphsView.propTypes = {
  intl: IntlPropType,
  monthlyGrowth: PropTypes.arrayOf(
    PropTypes.shape({
      count: PropTypes.number,
      monthName: PropTypes.string,
      year: PropTypes.string,
    })
  ),
  topFiveCompetencies: PropTypes.arrayOf(
    PropTypes.shape({
      count: PropTypes.number,
      name: PropTypes.string,
    })
  ).isRequired,
  topFiveDevelopmentalGoals: PropTypes.arrayOf(
    PropTypes.shape({
      count: PropTypes.number,
      name: PropTypes.string,
    })
  ).isRequired,
  topFiveSkills: PropTypes.arrayOf(
    PropTypes.shape({
      count: PropTypes.number,
      name: PropTypes.string,
    })
  ).isRequired,
};

DashboardGraphsView.defaultProps = {
  intl: undefined,
  monthlyGrowth: null,
};

export default injectIntl(DashboardGraphsView);
