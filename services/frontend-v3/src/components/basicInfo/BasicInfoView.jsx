import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";

import { Icon as LegacyIcon } from "@ant-design/compatible";

import { Row, Col, Card, Avatar, List, Typography, Button } from "antd";
const { Title, Text } = Typography;

class BasicInfoView extends Component {
  generateProfileHeader(dataSource) {
    const { name, jobTitle, avatar } = this.props;

    return (
      <Row type="flex" justify="center" align="middle" style={styles.row}>
        <Col xs={24} xl={6}>
          <Avatar
            size={150}
            style={(styles.userAvatar, { backgroundColor: avatar.color })}
          >
            <Text style={{ fontSize: "80px", color: "white" }}>
              {avatar.acr}
            </Text>
          </Avatar>
        </Col>
        <Col xs={24} xl={18}>
          <Row>
            <Title>{name}</Title>
          </Row>
          <Row>
            <Title level={2} type="secondary">
              {jobTitle}
            </Title>
          </Row>
        </Col>
      </Row>
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
                  icon={<LegacyIcon type={item.icon} />}
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
      description: data.email ? (
        data.email
      ) : (
        <FormattedMessage id="profile.not.specified" />
      )
    };

    const tel = {
      icon: "phone",
      title: <FormattedMessage id="profile.telephone" />,
      description: data.telephone ? (
        data.telephone
      ) : (
        <FormattedMessage id="profile.not.specified" />
      )
    };

    const cel = {
      icon: "mobile",
      title: <FormattedMessage id="profile.cellphone" />,
      description: data.cellphone ? (
        data.cellphone
      ) : (
        <FormattedMessage id="profile.not.specified" />
      )
    };

    return [email, tel, cel];
  }

  getLocationInfo(locale) {
    const data = this.props.data;

    const branch = {
      icon: "branches",
      title: <FormattedMessage id="profile.branch" />,
      description: data.branch && data.branch[locale]
    };

    const address = {
      icon: "environment",
      title: <FormattedMessage id="profile.address" />,
      description: data.location ? (
        data.location.description[locale]
      ) : (
        <FormattedMessage id="profile.not.specified" />
      )
    };

    const manager = {
      icon: "user",
      title: <FormattedMessage id="profile.manager" />,
      description: data.manager ? (
        data.manager
      ) : (
        <FormattedMessage id="profile.not.specified" />
      )
    };

    return [branch, address, manager];
  }

  generateActions() {
    const { buttonLinks } = this.props;

    const buttons = buttonLinks.buttons.map(buttonName => {
      const button = buttonLinks[buttonName];

      return (
        <Button
          block
          icon={<LegacyIcon type={button.icon} />}
          href={button.url}
        >
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
      <Card
        id="card-profile-basic-info"
        actions={this.generateActions()}
        style={styles.card}
      >
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
