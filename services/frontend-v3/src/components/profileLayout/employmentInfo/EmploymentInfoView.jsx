import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";

import { Row, Col, Card, Avatar, List, Button } from "antd";
import moment from "moment";

class EmploymentInfoView extends Component {
  render() {
    const locale = this.props.intl.formatMessage({ id: "language.code" });

    const info = this.getInfo(locale);

    return (
      <Card
        style={{ height: "100%" }}
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

    const subs = {
      icon: "mail",
      title: <FormattedMessage id="profile.substantive" />,
      description:
        data.indeterminate === true ? (
          <FormattedMessage id="profile.indeterminate" />
        ) : (
          <FormattedMessage id="profile.term" />
        )
    };

    const classi = {
      icon: "mail",
      title: <FormattedMessage id="profile.classification" />,
      description: data.classification.description || (
        <FormattedMessage id="profile.do.not.specify" />
      )
    };

    const tempRole = {
      icon: "mail",
      title: <FormattedMessage id="profile.temporary.role" />,
      description: data.temporaryRole.description[locale] || (
        <FormattedMessage id="profile.do.not.specify" />
      )
    };

    let actingInfo = [];
    if (data.acting.id != null) {
      const acting = {
        icon: "mail",
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
          icon: "calendar",
          title: <FormattedMessage id="profile.acting.date" />,
          description: desc
        };
        actingInfo.push(actingDate);
      }
    }

    const security = {
      icon: "mail",
      title: <FormattedMessage id="profile.security" />,
      description: data.security.description[locale] || (
        <FormattedMessage id="profile.do.not.specify" />
      )
    };

    return [subs, classi, tempRole, ...actingInfo, security];
  }
}

export default injectIntl(EmploymentInfoView);
