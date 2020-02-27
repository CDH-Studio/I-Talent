import React, { Component } from "react";
import AdminMenu from "../components/admin/AdminMenu";
import {
  Segment,
  Header,
  Button,
  Icon,
  Image,
  Statistic,
  Divider,
  Loader,
  Card
} from "semantic-ui-react";
import _ from "lodash";
import axios from "axios";
import moment from "moment";
import { FormattedMessage, injectIntl } from "react-intl";
import {
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ComposedChart,
  Line
} from "recharts";

import config from "../config";
const { backendAddress } = config;

const skillColours = ["#8C2336", "#6A9BA6", "#F28907", "#BF935E", "#BF3434"];

const competencyColours = [
  "#003f5c",
  "#58508d",
  "#bc5090",
  "#ff6361",
  "#ffa600"
];

const developmentGoalColours = [
  "#FF4400",
  "#F7DA00",
  "#07748C",
  "#E1DAD2",
  "#8E0000"
];

const growthRateColours = [
  "#3548AF",
  "#4392F1",
  "#78C0E0",
  "#6F9CEB",
  "#141B41"
];

class AdminDashboard extends Component {
  goto = (link, state) => this.props.history.push(link, state);

  constructor(props) {
    super(props);
    this.state = {
      type: "dashboard",
      loading: true,
      data: null
    };
  }

  componentDidMount() {
    document.title = this.getDisplayType(true) + " - Admin | UpSkill";
    this.setState({ loading: true });
    axios.get(backendAddress + "api/admin/" + this.state.type).then(res => {
      this.setState({
        data: res.data,
        loading: false
      });
    });
  }

  getDisplayType = plural => {
    if (plural)
      return this.props.intl.formatMessage({
        id: "admin." + this.state.type + ".plural",
        defaultMessage: this.state.type
      });

    return this.props.intl.formatMessage({
      id: "admin." + this.state.type + ".singular",
      defaultMessage: this.state.type
    });
  };

  numberOfOccurrences() {
    return this.props.intl.formatMessage({
      id: "admin.dashboard.number.of.occurrences"
    });
  }

  numberOfNewUsers() {
    return this.props.intl.formatMessage({
      id: "admin.dashboard.number.of.new.users"
    });
  }

  CustomizedAxisTick = props => {
    const { x, y, payload } = props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text dy={16} textAnchor="middle" fill="#666">
          {payload.value}
        </text>
      </g>
    );
  };

  CustomizedYAxisLabel = props => {
    const { x, y, payload } = props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          dy={16}
          offset={0}
          fontSize={12}
          text-align="center"
          textAnchor="end"
          fill="#666"
          transform="rotate(-90)"
        >
          {this.numberOfNewUsers()}
        </text>
      </g>
    );
  };

  render() {
    const { type, loading, data } = this.state;

    if (data) {
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
        previous_month_additions = monthlyGrowthRate[indexYear].data.find(
          object => object.month == current_month - 1
        );
      }
      const growthRate = Math.round(
        ((current_month_additions.count - previous_month_additions.count) /
          previous_month_additions.count) *
          100
      );

      const dashboardCount = data.dashboardCount;
      const { changeLanguage, keycloak } = this.props;

      return (
        <AdminMenu
          active={type}
          changeLanguage={changeLanguage}
          keycloak={keycloak}
          loading={loading}
          goto={this.goto}
        >
          <Header as="h1">{this.getDisplayType(true)}</Header>
          <Divider />

          <Statistic.Group color="blue" widths={16}>
            <Statistic>
              <Statistic.Value>
                <Icon name="user circle" color="green" /> {dashboardCount.user}
              </Statistic.Value>
              <Statistic.Label>
                <FormattedMessage id="admin.dashboard.total.users" />
              </Statistic.Label>
            </Statistic>

            <Statistic>
              <Statistic.Value>
                <Icon name="user circle" color="grey" />{" "}
                {dashboardCount.inactive}
              </Statistic.Value>
              <Statistic.Label>
                <FormattedMessage id="admin.dashboard.inactive.users" />
              </Statistic.Label>
            </Statistic>

            <Statistic>
              <Statistic.Value>
                <Icon name="hide circle" color="red" /> {dashboardCount.flagged}
              </Statistic.Value>
              <Statistic.Label>
                <FormattedMessage id="admin.dashboard.flagged.profiles" />
              </Statistic.Label>
            </Statistic>

            <Statistic>
              <Statistic.Value>
                <Icon name="address book circle" color="teal" />{" "}
                {dashboardCount.exFeeder}
              </Statistic.Value>
              <Statistic.Label>
                <FormattedMessage id="admin.dashboard.ex.feeders" />
              </Statistic.Label>
            </Statistic>
          </Statistic.Group>

          <Statistic.Group color="blue" widths={16}>
            <Statistic>
              <Statistic.Value>
                <Icon name="add user" color="purple" />{" "}
                {current_month_additions.count}
              </Statistic.Value>
              <Statistic.Label>
                <FormattedMessage id="admin.dashboard.monthly.added" />
              </Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>
                <Icon name="chart line" color="orange" /> {growthRate}
                {"%"}
              </Statistic.Value>
              <Statistic.Label>
                <FormattedMessage id="admin.dashboard.growth.rate.percentage" />
              </Statistic.Label>
            </Statistic>
          </Statistic.Group>

          <Card fluid>
            <Card.Content>
              <Card.Header>
                <FormattedMessage id="admin.dashboard.commonalities" />
              </Card.Header>
            </Card.Content>
            <Card.Content>
              <Card.Group>
                <Card fluid>
                  <Card.Content>
                    <Card.Header>
                      <FormattedMessage id="admin.dashboard.popular.skills" />
                    </Card.Header>
                  </Card.Content>
                  <Card.Content>
                    <ResponsiveContainer aspect={2}>
                      <BarChart
                        layout="vertical"
                        data={topFiveSkills}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 50,
                          bottom: 5
                        }}
                        barCategoryGap="20%"
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          type="number"
                          label={{
                            value: this.numberOfOccurrences(),
                            position: "insideBottomRight",
                            offset: 0,
                            dy: 2,
                            style: { fontSize: 10 }
                          }}
                          tick={<this.CustomizedAxisTick />}
                        />
                        <YAxis
                          type="category"
                          dataKey="name"
                          tick={{ interval: 0, style: { fontSize: 12 } }}
                        />
                        <Tooltip />
                        <Bar dataKey="count">
                          {topFiveSkills.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={skillColours[index]}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </Card.Content>
                </Card>
                <Card fluid>
                  <Card.Content>
                    <Card.Header>
                      <FormattedMessage id="admin.dashboard.popular.competencies" />
                    </Card.Header>
                  </Card.Content>
                  <Card.Content>
                    <ResponsiveContainer aspect={2}>
                      <BarChart
                        layout="vertical"
                        data={topFiveCompetencies}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 50,
                          bottom: 5
                        }}
                        barCategoryGap="20%"
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          type="number"
                          label={{
                            value: this.numberOfOccurrences(),
                            position: "insideBottomRight",
                            offset: 0,
                            dy: 2,
                            style: { fontSize: 10 }
                          }}
                          tick={<this.CustomizedAxisTick />}
                        />
                        <YAxis
                          type="category"
                          dataKey="name"
                          tick={{ interval: 0, style: { fontSize: 12 } }}
                        />
                        <Tooltip />
                        <Bar dataKey="count">
                          {topFiveCompetencies.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={competencyColours[index]}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </Card.Content>
                </Card>
                <Card fluid>
                  <Card.Content>
                    <Card.Header>
                      <FormattedMessage id="admin.dashboard.popular.development.goals" />
                    </Card.Header>
                  </Card.Content>
                  <Card.Content>
                    <ResponsiveContainer aspect={2}>
                      <BarChart
                        layout="vertical"
                        data={topFiveDevelopmentGoals}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 50,
                          bottom: 5
                        }}
                        barCategoryGap="20%"
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          type="number"
                          label={{
                            value: this.numberOfOccurrences(),
                            position: "insideBottomRight",
                            offset: 0,
                            dy: 2,
                            style: { fontSize: 10 }
                          }}
                          tick={<this.CustomizedAxisTick />}
                        />
                        <YAxis
                          type="category"
                          dataKey="name"
                          tick={{ interval: 0, style: { fontSize: 12 } }}
                        />
                        <Tooltip />
                        <Bar dataKey="count">
                          {topFiveDevelopmentGoals.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={developmentGoalColours[index]}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </Card.Content>
                </Card>
              </Card.Group>
            </Card.Content>
          </Card>

          <Card fluid>
            <Card.Content>
              <Card.Header>
                <FormattedMessage id="admin.dashboard.growth.rate.by.month" />
              </Card.Header>
            </Card.Content>
            <Card.Content>
              <ResponsiveContainer aspect={2}>
                <ComposedChart
                  data={monthlyGrowthRate}
                  margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
                >
                  <CartesianGrid />
                  <XAxis
                    dataKey="monthName"
                    type="category"
                    allowDuplicatedCategory={false}
                    data={monthlyGrowthRate}
                    tick={<this.CustomizedAxisTick />}
                  />
                  <YAxis
                    type="number"
                    dataKey="count"
                    label={this.CustomizedYAxisLabel}
                  />
                  <Tooltip />
                  <Legend />
                  {monthlyGrowthRate.map((period, index) => (
                    <Line
                      dataKey="count"
                      data={period.data}
                      name={period.year}
                      key={period.year}
                      type="monotone"
                      stroke={growthRateColours[index]}
                      strokeWidth={3}
                      activeDot={{ r: 8 }}
                    />
                  ))}
                </ComposedChart>
              </ResponsiveContainer>
            </Card.Content>
          </Card>
        </AdminMenu>
      );
    } else {
      return <div />;
    }
  }
}

export default injectIntl(AdminDashboard);
