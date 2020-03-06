import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import moment from "moment";

import { Icon as LegacyIcon } from '@ant-design/compatible';

import { Row, Col, Card, Avatar, List } from "antd";

class EducationView extends Component {
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
                  style={styles.avatar}
                  size="large"
                  icon={<LegacyIcon type={item.icon} />}
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
        const startDate = educElement.startDate[locale];
        const endDate = educElement.endDate[locale];

        const education = {
          icon: "bank",
          diploma: educElement.diploma.description[locale],
          school: educElement.school.description[locale],
          duration: this.getEducationDuration(startDate, endDate)
        };

        educationInfo.push(education);
      });
    }

    return [...educationInfo];
  }

  getEducationDuration(startDate, endDate) {
    const formatedStartDate = moment(startDate).format("LLL");
    const formatedEndDate = moment(endDate).format("LLL");

    const dateNotProvided = this.props.intl.formatMessage({
      id: "profile.date.not.provided"
    });
    const present = this.props.intl.formatMessage({
      id: "profile.end.date.present"
    });

    let duration = "";

    if (startDate === null && endDate === null) {
      duration = duration + dateNotProvided;
    } else if (startDate !== null && endDate === null) {
      duration = duration + formatedStartDate + " - " + present;
    } else {
      duration = duration + formatedStartDate + " - " + formatedEndDate;
    }

    return duration;
  }
  render() {
    const locale = this.props.intl.formatMessage({ id: "language.code" });

    const educationInfo = this.getEducationInfo(locale);

    return (
      <Card style={styles.card}>
        <Row>
          <Col xs={24} lg={24}>
            {this.generateEducationInfoList(educationInfo)}
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
  },
  avatar: {
    backgroundColor: "#007471"
  }
};

export default injectIntl(EducationView);
