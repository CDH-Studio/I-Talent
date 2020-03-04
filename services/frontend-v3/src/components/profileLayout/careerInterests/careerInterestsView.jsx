import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";

import { Row, Col, Card, List, Typography } from "antd";

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
      <List
        header={<FormattedMessage id="profile.willing.to.relocate.to" />}
        grid={{ gutter: 16, column: dataSource.length }}
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta title={item} />
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
    const lookingForNewJob = {
      icon: "mail",
      title: <FormattedMessage id="profile.looking.for.new.job" />,
      description: data.lookingForNewJob.description[locale] || (
        <FormattedMessage id="profile.do.not.specify" />
      )
    };

    return [interestedInRemote, lookingForNewJob];
  }

  getRelocationLocationsInfo(locale) {
    const data = this.props.data;

    const relocationLocationsInfo = [];
    data.relocationLocations.forEach(locationElement =>
      relocationLocationsInfo.push(locationElement.description[locale])
    );

    // const willingToRelocateTo = {
    //   icon: "mail",
    //   title: <FormattedMessage id="profile.willing.to.relocate.to" />,
    //   cities: data.relocationLocations[1].description[locale] || (
    //     <FormattedMessage id="profile.do.not.specify" />
    //   )
    // };

    return [...relocationLocationsInfo];
  }

  render() {
    const locale = this.props.intl.formatMessage({ id: "language.code" });

    const info = this.getCareerInterestsInfo(locale);
    const relocationLocationsInfo = this.getRelocationLocationsInfo(locale);

    return (
      <Card
        style={{ height: "100%" }}
        title={this.props.intl.formatMessage({
          id: "profile.career.interests"
        })}
      >
        <Row>
          <Col xs={24} lg={24}>
            {this.generateCareerInterestsInfoList(info)}
            {this.generateRelocationLocationsInfoList(relocationLocationsInfo)}
          </Col>
        </Row>
      </Card>
    );
  }
}

export default injectIntl(CareerInterestsView);
