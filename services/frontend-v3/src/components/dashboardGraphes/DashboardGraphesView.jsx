import React, { Component } from "react";
import { Card, Row, Col } from "antd";
import { Chart, Geom, Axis, Tooltip, Coord, Legend } from "bizcharts";

class DashboardGraphesView extends Component {
  render() {
    const {
      topFiveSkills,
      topFiveCompetencies,
      topFiveDevelopmentGoals,
      monthlyGrowth
    } = this.props;

    // Graph Columns:
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

    return (
      <Col span={24}>
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
                data={monthlyGrowth}
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
      </Col>
    );
  }
}

export default DashboardGraphesView;
