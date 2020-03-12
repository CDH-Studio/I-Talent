import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";

import { Row, Col, Card, List } from "antd";
import moment from "moment";

class EmploymentInfoView extends Component {
  generateInfoList(dataSource) {
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

  getInfo(locale) {
    const data = this.props.data;

    const substantive = {
      title: <FormattedMessage id="profile.substantive" />,
      description:
        data.indeterminate === true ? (
          <FormattedMessage id="profile.indeterminate" />
        ) : (
          <FormattedMessage id="profile.term" />
        )
    };

    const classification = {
      title: <FormattedMessage id="profile.classification" />,
      description: data.classification.description || (
        <FormattedMessage id="profile.not.specified" />
      )
    };

    const temporaryRole = {
      title: <FormattedMessage id="profile.temporary.role" />,
      description: data.temporaryRole.description[locale] || (
        <FormattedMessage id="profile.not.specified" />
      )
    };

    let actingInfo = [];
    if (data.acting.id != null) {
      const acting = {
        title: <FormattedMessage id="profile.acting" />,
        description: data.acting.description
      };
      actingInfo.push(acting);

      if (data.actingPeriodStartDate) {
        let desc =
          moment(data.actingPeriodStartDate).format("ll") +
          (data.actingPeriodEndDate
            ? " - " + moment(data.actingPeriodEndDate).format("ll")
            : "");

        const actingDate = {
          title: <FormattedMessage id="profile.acting.date" />,
          description: desc
        };
        actingInfo.push(actingDate);
      }
    }

    const security = {
      title: <FormattedMessage id="profile.security" />,
      description: data.security.description[locale] || (
        <FormattedMessage id="profile.not.specified" />
      )
    };

    return [
      substantive,
      classification,
      temporaryRole,
      ...actingInfo,
      security
    ];
  }
  render() {
    const locale = this.props.intl.formatMessage({ id: "language.code" });

    const info = this.getInfo(locale);

    return (
      <Card
        style={styles.card}
        title={this.props.intl.formatMessage({ id: "profile.info" })}
      >
        <Row>
          <Col xs={24} lg={24}>
            {this.generateInfoList(info)}
          </Col>
        </Row>
      </Card>
    );
  }
}

/* Component Styles */
const styles = {
  card: {
    height: "100%"
  }
};

export default injectIntl(EmploymentInfoView);
