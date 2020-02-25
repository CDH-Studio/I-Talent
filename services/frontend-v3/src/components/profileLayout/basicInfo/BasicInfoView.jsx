import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";

import { Row, Col, Card, Typography, Avatar, List, Form, Icon } from "antd";
const { Title } = Typography;

class BasicInfoView extends Component {
  render() {
    const { data, avatar } = this.props;

    const locale = this.props.intl.formatMessage({ id: "language.code" });

    const contactInfo = this.getContactInfo();
    const locationInfo = this.getLocationInfo(locale);

    return (
      <div>
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
              <Title style={{ display: "inline" }}>
                {data.firstName + " " + data.lastName}
              </Title>
              <Title level={2} style={{ display: "inline" }}>
                {"   "}-{"   "}
              </Title>
              <Title level={2} style={{ display: "inline" }}>
                {data.jobTitle[locale]}
              </Title>
            </Col>
          </Row>
        </Row>
        <Card>
          <Row>
            <Col xs={24} lg={12}>
              <List
                itemLayout="horizontal"
                dataSource={contactInfo}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{
                            backgroundColor: avatar.color
                          }}
                          size="large"
                          icon={item.icon}
                          shape="square"
                        />
                      }
                      title={<a href="https://ant.design">{item.title}</a>}
                      description={item.description}
                    />
                  </List.Item>
                )}
              />
            </Col>
            <Col xs={24} lg={12}>
              <List
                itemLayout="horizontal"
                dataSource={locationInfo}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{
                            backgroundColor: avatar.color
                          }}
                          size="large"
                          icon={item.icon}
                          shape="square"
                        />
                      }
                      title={<a href="https://ant.design">{item.title}</a>}
                      description={item.description}
                    />
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </Card>
      </div>
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
}

export default injectIntl(BasicInfoView);
