import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";

import { Row, Col, Card, List } from "antd";

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
      title: <FormattedMessage id="profile.career.mobility" />,
      description: data.careerMobility.description[locale] || (
        <FormattedMessage id="profile.not.specified" />
      )
    };

    const talentMatrixResult = {
      title: <FormattedMessage id="profile.talent.matrix.result" />,
      description: data.talentMatrixResult.description[locale] || (
        <FormattedMessage id="profile.not.specified" />
      )
    };

    return [careerMobility, talentMatrixResult];
  }

  render() {
    const locale = this.props.intl.formatMessage({ id: "language.code" });

    const info = this.getTalentManagementInfo(locale);

    return (
      <Card
        id="card-profile-talent-management"
        style={styles.card}
        title={this.props.intl.formatMessage({
          id: "profile.talent.management"
        })}
      >
        <Row>
          <Col xs={24} lg={24}>
            {this.generateTalentManagementInfoList(info)}
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

export default injectIntl(TalentManagementView);
