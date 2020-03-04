import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";

import { Row, Col, Card, Avatar, List, Typography, Button } from "antd";
const { Title } = Typography;

class BasicInfoView extends Component {
  generateInfoList(dataSource) {
    return (
      <List
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  style={{
                    backgroundColor: "#007471"
                  }}
                  size="large"
                  icon={item.icon}
                  shape="square"
                />
              }
              title={item.title}
              description={item.description}
            />
          </List.Item>
        )}
      />
    );
  }

  getContactInfo() {
    const data = this.props.data;

    const email = {
      icon: "mail",
      title: <FormattedMessage id="profile.email" />,
      description: data.email
    };

    const tel = {
      icon: "phone",
      title: <FormattedMessage id="profile.telephone" />,
      description: data.cellphone
    };

    const cel = {
      icon: "mobile",
      title: <FormattedMessage id="profile.cellphone" />,
      description: data.cellphone
    };

    return [email, tel, cel];
  }

  getLocationInfo(locale) {
    const data = this.props.data;

    const branch = {
      icon: "branches",
      title: <FormattedMessage id="profile.branch" />,
      description: data.branch[locale]
    };

    const address = {
      icon: "environment",
      title: <FormattedMessage id="profile.address" />,
      description: data.location.description[locale]
    };

    const manager = {
      icon: "user",
      title: <FormattedMessage id="profile.manager" />,
      description: data.manager
    };

    return [branch, address, manager];
  }

  generateActions() {
    const { buttonLinks } = this.props;

    const buttons = buttonLinks.buttons.map(buttonName => {
      const button = buttonLinks[buttonName];

      return (
        <Button block icon={button.icon} href={button.url}>
          {this.props.intl.formatMessage({ id: button.textId })}
        </Button>
      );
    });

    return buttons;
  }

  render() {
    const locale = this.props.intl.formatMessage({ id: "language.code" });
    const { name, jobTitle, avatar } = this.props;

    const contactInfo = this.getContactInfo();
    const locationInfo = this.getLocationInfo(locale);

    return (
      <Card actions={this.generateActions()} style={{ height: "100%" }}>
        <Row style={{ marginBottom: "20px" }}>
          <Col xs={5} sm={4} md={3} lg={2} xl={2}>
            <Avatar
              size={64}
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
        <Row>
          <Col xs={24} lg={12}>
            {this.generateInfoList(contactInfo)}
          </Col>
          <Col xs={24} lg={12}>
            {this.generateInfoList(locationInfo)}
          </Col>
        </Row>
      </Card>
    );
  }
}

export default injectIntl(BasicInfoView);
