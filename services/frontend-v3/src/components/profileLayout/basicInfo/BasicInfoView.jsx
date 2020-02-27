import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";

import { Row, Col, Card, Avatar, List, Button } from "antd";

class BasicInfoView extends Component {
  render() {
    const locale = this.props.intl.formatMessage({ id: "language.code" });

    const contactInfo = this.getContactInfo();
    const locationInfo = this.getLocationInfo(locale);

    return (
      <div>
        <Card actions={this.generateActions()}>
          <Row>
            <Col xs={24} lg={12}>
              {this.generateContactList(contactInfo)}
            </Col>
            <Col xs={24} lg={12}>
              {this.generateContactList(locationInfo)}
            </Col>
          </Row>
        </Card>
      </div>
    );
  }

  generateContactList(dataSource) {
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
                    backgroundColor: this.props.avatar.color
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
}

export default injectIntl(BasicInfoView);
