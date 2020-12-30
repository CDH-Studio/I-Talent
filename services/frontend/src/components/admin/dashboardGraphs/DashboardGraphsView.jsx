import PropTypes from "prop-types";
import { Card, Row, Col } from "antd";
import { FormattedMessage, injectIntl } from "react-intl";
import Chart from "react-chartjs-2";
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
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          ticks: { display: false },
        },
      ],
      yAxes: [
        {
          ticks: {
            stepSize: 1,
            beginAtZero: true,
          },
          scaleLabel: {
            display: true,
            labelString: intl.formatMessage({
              id: "dashboard.number.of.occurrences",
            }),
          },
        },
      ],
    },
  };

  const barGraphData = (data, type) => ({
    labels: [intl.formatMessage({ id: `admin.dashboard.popular.${type}` })],
    datasets: data
      ? data.map((element, index) => ({
          data: [element.count],
          backgroundColor: chartColors[index],
          label: element.name,
          barPercentage: 0.8,
        }))
      : [],
  });

  const monthlyGrowthData = {
    datasets: [
      {
        label: intl.formatMessage({
          id: "dashboard.number.of.occurrences",
        }),
        data: monthlyGrowth
          ? monthlyGrowth.map((element) => element.count)
          : [],
        backgroundColor: "rgb(8, 116, 114)",
      },
    ],
    labels: monthlyGrowth
      ? monthlyGrowth.map((element) => `${element.monthName} - ${element.year}`)
      : [],
  };

  return (
    <>
      <Row gutter={[8, 8]}>
        <Col xs={24} sm={24} md={12} xl={8}>
          <Card
            title={<FormattedMessage id="dashboard.popular.skills" />}
            loading={topFiveSkills.length === 0}
            bodyStyle={{ height: graphHeight }}
          >
            <Chart
              type="bar"
              data={barGraphData(topFiveSkills, "skills")}
              options={options}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} xl={8}>
          <Card
            title={<FormattedMessage id="dashboard.popular.competencies" />}
            loading={topFiveCompetencies.length === 0}
            bodyStyle={{ height: graphHeight }}
          >
            <Chart
              type="bar"
              data={barGraphData(topFiveCompetencies, "competencies")}
              options={options}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} xl={8}>
          <Card
            title={
              <FormattedMessage id="dashboard.popular.development.goals" />
            }
            loading={topFiveDevelopmentalGoals.length === 0}
            bodyStyle={{ height: graphHeight }}
          >
            <Chart
              type="bar"
              data={barGraphData(
                topFiveDevelopmentalGoals,
                "development.goals"
              )}
              options={options}
            />
          </Card>
        </Col>
        {monthlyGrowth && (
          <Col span={24} md={12} xl={24}>
            <Card
              title={<FormattedMessage id="growth.rate.by.month" />}
              loading={monthlyGrowth.length === 0}
              bodyStyle={{ height: graphHeight }}
            >
              <Chart type="line" data={monthlyGrowthData} options={options} />
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
