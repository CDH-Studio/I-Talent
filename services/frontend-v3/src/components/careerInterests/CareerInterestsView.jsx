import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";

import { Row, Col, Card, List, Tag, Typography } from "antd";

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

  generateRelocationLocationsInfoList(dataSource) {
    return (
      <div>
        <Typography.Text strong>
          <FormattedMessage id="profile.willing.to.relocate.to" />:{" "}
        </Typography.Text>
        {dataSource.map(loc => (
          <Tag>{loc}</Tag>
        ))}
      </div>
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
    const lookingForNewJob = {
      icon: "mail",
      title: <FormattedMessage id="profile.looking.for.new.job" />,
      description: (data.lookingForNewJob &&
        data.lookingForNewJob.description[locale]) || (
        <FormattedMessage id="profile.not.specified" />
      )
    };

    return [interestedInRemote, lookingForNewJob];
  }

  getRelocationLocationsInfo(locale) {
    const data = this.props.data;

    const relocationLocationsInfo = [];
    if (data.relocationLocations) {
      data.relocationLocations.forEach(locationElement =>
        relocationLocationsInfo.push(locationElement.description[locale])
      );
    }

    return [...relocationLocationsInfo];
  }

  render() {
    const locale = this.props.intl.formatMessage({ id: "language.code" });

    const info = this.getCareerInterestsInfo(locale);
    const relocationLocationsInfo = this.getRelocationLocationsInfo(locale);

    return (
      <Row>
        <Col span={24}>
          {this.generateCareerInterestsInfoList(info)}
          {this.generateRelocationLocationsInfoList(relocationLocationsInfo)}
        </Col>
      </Row>
    );
  }
}

/* Component Styles */
const styles = {
  card: {
    height: "100%"
  }
};

export default injectIntl(CareerInterestsView);
