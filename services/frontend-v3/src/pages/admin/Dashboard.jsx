import React from "react";
import SiderLayout from "../../components/layout/SiderLayout";
import axios from "axios";
import { Typography, Skeleton, Statistic, Card, Row, Col, Icon } from "antd";
import moment from "moment";
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";
import { injectIntl } from "react-intl";
import config from "../../config";

const backendAddress = config.backendAddress;

const { Title } = Typography;

const popularSkillsColumns = {
  name: { alias: "Skill Name" },
  count: { alias: "Number of users" }
};

const popularCompetenciesColumns = {
  name: { alias: "Competency Name" },
  count: { alias: "Number of users" }
};

const popularDevelopmentGoalsColumns = {
  name: { alias: "Development Goal Name" },
  count: { alias: "Number of users" }
};

const growthRateByMonthColumns = {
  monthName: { range: [0, 1] },
  count: { alias: "Number of users" }
};

const testCities = [
  {
    month: "Jan",
    city: "China",
    revenue: 7
  },
  {
    month: "Jan",
    city: "Oversea",
    revenue: 3.9
  },
  {
    month: "Feb",
    city: "China",
    revenue: 6.9
  },
  {
    month: "Feb",
    city: "Oversea",
    revenue: 4.2
  },
  {
    month: "Mar",
    city: "China",
    revenue: 9.5
  },
  {
    month: "Mar",
    city: "Oversea",
    revenue: 5.7
  },
  {
    month: "Apr",
    city: "China",
    revenue: 14.5
  },
  {
    month: "Apr",
    city: "Oversea",
    revenue: 8.5
  },
  {
    month: "May",
    city: "China",
    revenue: 18.4
  },
  {
    month: "May",
    city: "Oversea",
    revenue: 11.9
  },
  {
    month: "Jun",
    city: "China",
    revenue: 21.5
  },
  {
    month: "Jun",
    city: "Oversea",
    revenue: 15.2
  },
  {
    month: "Jul",
    city: "China",
    revenue: 25.2
  },
  {
    month: "Jul",
    city: "Oversea",
    revenue: 17
  },
  {
    month: "Aug",
    city: "China",
    revenue: 26.5
  },
  {
    month: "Aug",
    city: "Oversea",
    revenue: 16.6
  },
  {
    month: "Sep",
    city: "China",
    revenue: 23.3
  },
  {
    month: "Sep",
    city: "Oversea",
    revenue: 14.2
  },
  {
    month: "Oct",
    city: "China",
    revenue: 18.3
  },
  {
    month: "Oct",
    city: "Oversea",
    revenue: 10.3
  },
  {
    month: "Nov",
    city: "China",
    revenue: 13.9
  },
  {
    month: "Nov",
    city: "Oversea",
    revenue: 6.6
  },
  {
    month: "Dec",
    city: "China",
    revenue: 9.6
  },
  {
    month: "Dec",
    city: "Oversea",
    revenue: 4.8
  }
];

const cols = {
  month: { range: [0, 1] }
};

class AdminDashboard extends React.Component {
  goto = link => this.props.history.push(link);

  constructor(props) {
    super(props);

    document.title = "Admin | UpSkill";

    this.state = { data: null, loading: true };
  }

  componentDidMount() {
    axios
      .get(backendAddress + "api/admin/dashboard/")
      .then(res => this.setState({ data: res.data, loading: false }))
      .catch(function(error) {
        console.error(error);
      });
  }

  render() {
    const { data, loading } = this.state;
    if (loading) {
      return (
        <SiderLayout>
          <Skeleton active />
        </SiderLayout>
      );
    }

    // Skills Count:
    const skillsCount = data.skillCount;

    const topFiveSkills = [];

    for (let i = 0; i < 5; i++) {
      const skill = skillsCount[i];

      topFiveSkills.push({
        name:
          this.props.intl.formatMessage({ id: "language.code" }) === "en"
            ? skill.descriptionEn
            : skill.descriptionFr,
        count: parseInt(skill.countOccurences)
      });
    }

    // Competencies Count:
    const competenciesCount = data.compCount;

    const topFiveCompetencies = [];

    for (let i = 0; i < 5; i++) {
      const competency = competenciesCount[i];

      topFiveCompetencies.push({
        name:
          this.props.intl.formatMessage({ id: "language.code" }) === "en"
            ? competency.descriptionEn
            : competency.descriptionFr,
        count: parseInt(competency.countOccurences)
      });
    }

    // Development Goals Count:
    const developmentGoalsCount = data.developCount;

    const topFiveDevelopmentGoals = [];

    for (let i = 0; i < 5; i++) {
      const developmentGoal = developmentGoalsCount[i];

      topFiveDevelopmentGoals.push({
        name:
          this.props.intl.formatMessage({ id: "language.code" }) === "en"
            ? developmentGoal.descriptionEn
            : developmentGoal.descriptionFr,
        count: parseInt(developmentGoal.countOccurences)
      });
    }

    // Growth Rate By Month:
    let monthlyGrowthRate = data.growthRateByMonth;

    const months = moment.monthsShort();

    monthlyGrowthRate = monthlyGrowthRate.map((entry, index) => {
      let addData = [];

      for (let i = 0; i < 12; i++) {
        addData.push({
          month: i,
          monthName: months[i],
          count: entry.data[i].count
        });
      }
      entry.data = addData;
      return entry;
    });

    //console.log(monthlyGrowthRate);

    let testData = [];

    monthlyGrowthRate = monthlyGrowthRate.map((entry, index) => {
      for (let i = 0; i < 12; i++) {
        testData.push({
          year: entry.year.toString(),
          month: i,
          monthName: entry.data[i].monthName,
          count: entry.data[i].count
        });
      }
      entry.data = testData;
      return entry;
    });

    console.log(testData);
    console.log(monthlyGrowthRate);

    const test = testData;

    // Users Added This Month & Growth Rate Percentage:
    const current_year = moment().year();

    const current_month = moment().month();

    const indexYear = monthlyGrowthRate.findIndex(
      object => object.year == current_year
    );

    const current_month_additions = monthlyGrowthRate[indexYear].data.find(
      object => object.month == current_month
    );

    let previous_month_additions = {};

    if (current_month == 0) {
      previous_month_additions = monthlyGrowthRate[indexYear - 1].data.find(
        object => object.month == 11
      );
    } else {
      previous_month_additions = monthlyGrowthRate[indexYear - 1].data.find(
        object => object.month == 11
      );
    }
    const growthRate = Math.round(
      ((current_month_additions.count - previous_month_additions.count) /
        previous_month_additions.count) *
        100
    );

    return (
      <SiderLayout
        changeLanguage={this.props.changeLanguage}
        keycloak={this.props.keycloak}
        history={this.props.history}
        data={data}
      >
        <Title>Admin Dashboard</Title>
        <Row gutter={[8, 8]}>
          <Col span={4}>
            <Card hoverable>
              <Statistic
                title={this.props.intl.formatMessage({
                  id: "admin.dashboard.total.users",
                  defaultMessage: "Total Users"
                })}
                value={data.dashboardCount.user}
                valueStyle={{ color: "#3f8600" }}
                prefix={<Icon type="team" />}
              />
            </Card>
          </Col>
          <Col span={4}>
            <Card hoverable>
              <Statistic
                title={this.props.intl.formatMessage({
                  id: "admin.dashboard.inactive.users",
                  defaultMessage: "Inactive Users"
                })}
                value={data.dashboardCount.inactive}
                valueStyle={{ color: "#515052" }}
                prefix={<Icon type="user" />}
              />
            </Card>
          </Col>
          <Col span={4}>
            <Card hoverable>
              <Statistic
                title={this.props.intl.formatMessage({
                  id: "admin.dashboard.flagged.profiles",
                  defaultMessage: "Hidden Profiles"
                })}
                value={data.dashboardCount.flagged}
                valueStyle={{ color: "#cf1322" }}
                prefix={<Icon type="eye-invisible" theme="filled" />}
              />
            </Card>
          </Col>
          <Col span={4}>
            <Card hoverable>
              <Statistic
                title={this.props.intl.formatMessage({
                  id: "admin.dashboard.ex.feeders",
                  defaultMessage: "Total Ex Feeders"
                })}
                value={data.dashboardCount.exFeeder}
                valueStyle={{ color: "#82A7A6" }}
                prefix={<Icon type="solution" />}
              />
            </Card>
          </Col>
          <Col span={4}>
            <Card hoverable>
              <Statistic
                title={
                  this.props.intl.formatMessage({
                    id: "admin.dashboard.monthly.added",
                    defaultMessage: "New Users - " + moment().format("MMMM")
                  }) + moment().format("MMMM")
                }
                value={current_month_additions.count}
                valueStyle={{ color: "#CD8FD6" }}
                prefix={<Icon type="usergroup-add" />}
              />
            </Card>
          </Col>
          <Col span={4}>
            <Card hoverable>
              <Statistic
                title={
                  this.props.intl.formatMessage({
                    id: "admin.dashboard.growth.rate.percentage",
                    defaultMessage: "Growth Rate - " + moment().format("MMMM")
                  }) + moment().format("MMMM")
                }
                value={growthRate}
                valueStyle={{ color: "#FF934F" }}
                prefix={<Icon type="rise" />}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col span={8}>
            <Card
              hoverable
              title={this.props.intl.formatMessage({
                id: "admin.dashboard.popular.skills",
                defaultMessage: "Popular Skills"
              })}
            >
              <Chart
                data={topFiveSkills}
                scale={popularSkillsColumns}
                padding="auto"
                forceFit
              >
                <Axis name="name" visible={false} />
                <Axis name="count" title />
                <Coord scale={[0.7, 0.9]} />
                <Legend
                  position="top"
                  dy={-20}
                  textStyle={{ fontSize: "12" }}
                />
                <Tooltip />
                <Geom type="interval" position="name*count" color="name" />
              </Chart>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              title={this.props.intl.formatMessage({
                id: "admin.dashboard.popular.competencies",
                defaultMessage: "Popular Competencies"
              })}
            >
              <Chart
                data={topFiveCompetencies}
                scale={popularCompetenciesColumns}
                padding="auto"
                forceFit
              >
                <Axis name="name" visible={false} />
                <Axis name="count" title />
                <Coord scale={[0.7, 0.9]} />
                <Legend
                  position="top"
                  dy={-20}
                  textStyle={{ fontSize: "11" }}
                />
                <Tooltip />
                <Geom type="interval" position="name*count" color="name" />
              </Chart>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              title={this.props.intl.formatMessage({
                id: "admin.dashboard.popular.development.goals",
                defaultMessage: "Popular Development Goals"
              })}
            >
              <Chart
                data={topFiveDevelopmentGoals}
                scale={popularDevelopmentGoalsColumns}
                padding="auto"
                forceFit
              >
                <Axis name="name" visible={false} />
                <Axis name="count" title />
                <Coord scale={[0.7, 0.9]} />
                <Legend
                  position="top"
                  dy={-20}
                  textStyle={{ fontSize: "12" }}
                />
                <Tooltip />
                <Geom type="interval" position="name*count" color="name" />
              </Chart>
            </Card>
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Card
              hoverable
              title={this.props.intl.formatMessage({
                id: "admin.dashboard.growth.rate.by.month",
                defaultMessage: "Growth Rate By Month"
              })}
            >
              <Chart
                data={test}
                scale={growthRateByMonthColumns}
                padding="auto"
                forceFit
              >
                <Legend />
                <Axis name="monthName" />
                <Axis name="count" />
                <Tooltip crosshairs={{ type: "y" }} />
                <Geom
                  type="line"
                  position="monthName*count"
                  size={2}
                  color={"year"}
                />
                <Geom
                  type="point"
                  position="monthName*count"
                  size={4}
                  shape={"circle"}
                  color={"year"}
                  style={{
                    stroke: "#fff",
                    lineWidth: 1
                  }}
                />
              </Chart>
            </Card>
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Card
              hoverable
              title={this.props.intl.formatMessage({
                id: "admin.dashboard.growth.rate.by.month",
                defaultMessage: "Growth Rate By Month"
              })}
            >
              <Chart data={testCities} scale={cols} padding="auto" forceFit>
                <Legend />
                <Axis name="month" />
                <Axis name="revenue" />
                <Tooltip crosshairs={{ type: "y" }} />
                <Geom
                  type="line"
                  position="month*revenue"
                  size={2}
                  color={"city"}
                />
                <Geom
                  type="point"
                  position="month*revenue"
                  size={4}
                  shape={"circle"}
                  color={"city"}
                  style={{
                    stroke: "#fff",
                    lineWidth: 1
                  }}
                />
              </Chart>
            </Card>
          </Col>
        </Row>
      </SiderLayout>
    );
  }
}

export default injectIntl(AdminDashboard);
