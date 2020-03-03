import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";

import { Row, Col, Card, Avatar, List, Button } from "antd";
import moment from "moment";

class TalentManagementView extends Component {
  generateTalentManagementInfoList(dataSource) {
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

  getTalentManagementInfo(locale) {
    const data = this.props.data;

    const careerMobility = {
      icon: "mail",
      title: <FormattedMessage id="profile.career.mobility" />,
      description: data.careerMobility.description[locale] || (
        <FormattedMessage id="profile.do.not.specify" />
      )
    };

    const talentMatrixResult = {
      icon: "mail",
      title: <FormattedMessage id="profile.talent.matrix.result" />,
      description: data.talentMatrixResult.description[locale] || (
        <FormattedMessage id="profile.do.not.specify" />
      )
    };

    return [careerMobility, talentMatrixResult];
  }

  render() {
    const locale = this.props.intl.formatMessage({ id: "language.code" });

    const info = this.getTalentManagementInfo(locale);

    return (
      <Card
        style={{ height: "100%" }}
        title={this.props.intl.formatMessage({
          id: "profile.talent.management"
        })}
      >
        <Row>
          <Col xs={24} lg={12}>
            {this.generateTalentManagementInfoList(info)}
          </Col>
        </Row>
      </Card>
    );
  }
}

export default injectIntl(TalentManagementView);
