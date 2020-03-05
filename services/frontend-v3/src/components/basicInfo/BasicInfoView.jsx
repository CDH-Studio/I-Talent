import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";

import { Row, Col, Card, Avatar, List, Typography, Button } from "antd";
const { Title } = Typography;

class BasicInfoView extends Component {
  generateProfileHeader(dataSource) {
    const { name, jobTitle, avatar } = this.props;

    return (
      <List
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  size={150}
                  style={(styles.userAvatar, { backgroundColor: avatar.color })}
                >
                  {avatar.acr}
                </Avatar>
              }
              title={<Title>{name}</Title>}
              description={
                <Title level={2} type="secondary">
                  {jobTitle}
                </Title>
              }
            />
          </List.Item>
        )}
      />
    );
  }

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
                  style={styles.avatar}
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
    const { name, jobTitle } = this.props;

    const contactInfo = this.getContactInfo();
    const locationInfo = this.getLocationInfo(locale);
    const data = [{ name, jobTitle }];

    return (
      <Card actions={this.generateActions()} style={styles.card}>
        <Row style={styles.row}></Row>
        {this.generateProfileHeader(data)}
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

/* Component Styles */
const styles = {
  row: {
    marginBottom: "30px"
  },
  card: {
    height: "100%"
  },
  avatar: {
    backgroundColor: "#007471"
  },
  userAvatar: {
    verticalAlign: "middle"
  }
};

export default injectIntl(BasicInfoView);
