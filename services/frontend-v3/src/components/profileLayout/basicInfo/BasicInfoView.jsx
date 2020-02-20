import React, { Component } from "react";

import { Typography, Avatar, Row, Col, Descriptions, Statistic } from "antd";
const { Title } = Typography;

class BasicInfoView extends Component {
  render() {
    const { name, data, avatar, locale } = this.props;
    return (
      <div>
        <Row>
          <Col span="1">
            <Avatar
              size="large"
              style={{ backgroundColor: avatar.color, verticalAlign: "middle" }}
            >
              {avatar.acr}
            </Avatar>
          </Col>
          <Col>
            <Title>{name}</Title>
          </Col>
        </Row>
        <Descriptions title="User Info" bordered>
          <Descriptions.Item label="Job Title">
            {data.jobTitle[locale]}
          </Descriptions.Item>
          <Descriptions.Item label="Branch" span={2}>
            {data.branch[locale]}
          </Descriptions.Item>
          <Descriptions.Item label="Phone Number">
            {data.telephone}
          </Descriptions.Item>
          <Descriptions.Item label="Cellphone Number">
            {data.cellphone}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{data.email}</Descriptions.Item>
          <Descriptions.Item label="Address" span={3}>
            {data.location.description[locale]}
          </Descriptions.Item>
          <Descriptions.Item label="Usage Time">
            <Statistic.Countdown
              title="Cool Countdown"
              value={Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30}
              format="HH:mm:ss:SSS"
            />
            Cause why not
          </Descriptions.Item>
        </Descriptions>
      </div>
    );
  }
}

export default BasicInfoView;
