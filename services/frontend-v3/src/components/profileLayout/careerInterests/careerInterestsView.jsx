import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";

import { Row, Col, Card, List } from "antd";

class CareerInterestsView extends Component {
  generateCareerInterestsInfoList(dataSource) {
    return (
      <List
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    );
  }

  getCareerInterestsInfo(locale) {
    const data = this.props.data;

    const interestedInRemote = {
      icon: "mail",
      title: <FormattedMessage id="profile.interested.in.remote" />,
      description:
        data.interestedInRemote === true ? (
          <FormattedMessage id="profile.yes" />
        ) : (
          <FormattedMessage id="profile.no" />
        )
    };

    // TODO: Need to fix this so I can display all the cities
    const willingToRelocateTo = {
      icon: "mail",
      title: <FormattedMessage id="profile.willing.to.relocate.to" />,
      cities: data.relocationLocations[0].description[locale] || (
        <FormattedMessage id="profile.do.not.specify" />
      )
    };

    const lookingForNewJob = {
      icon: "mail",
      title: <FormattedMessage id="profile.looking.for.new.job" />,
      description: data.lookingForNewJob.description[locale] || (
        <FormattedMessage id="profile.do.not.specify" />
      )
    };

    return [interestedInRemote, willingToRelocateTo, lookingForNewJob];
  }

  render() {
    const locale = this.props.intl.formatMessage({ id: "language.code" });

    const info = this.getCareerInterestsInfo(locale);

    return (
      <Card
        style={{ height: "100%" }}
        title={this.props.intl.formatMessage({
          id: "profile.career.interests"
        })}
      >
        <Row>
          <Col xs={24} lg={12}>
            {this.generateCareerInterestsInfoList(info)}
          </Col>
        </Row>
      </Card>
    );
  }
}

export default injectIntl(CareerInterestsView);
