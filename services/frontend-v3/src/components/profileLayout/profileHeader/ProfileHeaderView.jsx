import React, { Component } from "react";
import { injectIntl } from "react-intl";

import { Row, Col, Typography, Avatar } from "antd";
const { Title } = Typography;

class ProfileHeaderView extends Component {
  render() {
    const { name, jobTitle, avatar } = this.props;

    const locale = this.props.intl.formatMessage({ id: "language.code" });

    return (
      <Row>
        <Col xs={5} sm={4} md={3} lg={2} xl={2}>
          <Avatar
            size="large"
            style={{ backgroundColor: avatar.color, verticalAlign: "middle" }}
          >
            {avatar.acr}
          </Avatar>
        </Col>

        <Row type="flex" align="bottom">
          <Col
            xs={19}
            sm={20}
            md={21}
            lg={22}
            xl={22}
            style={{ marginBottom: "10px" }}
          >
            <Title style={{ display: "inline" }}>{name}</Title>
            <Title level={2} style={{ display: "inline" }}>
              {"   "}-{"   "}
            </Title>
            <Title level={2} style={{ display: "inline" }}>
              {jobTitle}
            </Title>
          </Col>
        </Row>
      </Row>
    );
  }
}

export default injectIntl(ProfileHeaderView);
