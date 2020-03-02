import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";

import { Row, Col, Card, Typography, Avatar, List, Button } from "antd";
const { Title } = Typography;

class EducationView extends Component {
  render() {
    const { data, avatar } = this.props;

    const locale = this.props.intl.formatMessage({ id: "language.code" });

    const educationInfo = this.getEducationInfo(locale);

    return (
      <Card style={{ height: "100%" }}>
        <Row>
          <Col xs={24} lg={24}>
            {this.generateEducationInfoList(educationInfo)}
          </Col>
        </Row>
      </Card>
    );
  }

  generateEducationInfoList(dataSource) {
    return (
      <List
        header={<FormattedMessage id="profile.education" />}
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={item => (
          <List.Item extra={item.duration}>
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
              title={item.diploma}
              description={item.school}
            />
          </List.Item>
        )}
      />
    );
  }

  getEducationInfo(locale) {
    const data = this.props.data;

    let educationInfo = [];
    if (data.education != null) {
      data.education.forEach(educElement => {
        const education = {
          icon: "bank",
          diploma: educElement.diploma.description[locale],
          school: educElement.school.description[locale],
          duration:
            educElement.endDate === null
              ? educElement.startDate[locale] +
                " - " +
                educElement.endDate[locale]
              : educElement.startDate[locale] + " - " + "Present"
        };

        educationInfo.push(education);
      });
    }

    return [...educationInfo];
  }
}

export default injectIntl(EducationView);
