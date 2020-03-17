import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import moment from "moment";

import { Icon as LegacyIcon } from "@ant-design/compatible";

import { Row, Col, Card, Avatar, List } from "antd";

class ExperienceView extends Component {
  generateExperienceInfoList(dataSource) {
    return (
      <List
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
              title={item.jobTitle}
              description={item.organizationName}
            />
          </List.Item>
        )}
      />
    );
  }

  getExperienceInfo(locale) {
    const data = this.props.data;

    let experienceInfo = [];
    if (data.education != null) {
      data.careerSummary.forEach(expElement => {
        const startDate = expElement.startDate;
        const endDate = expElement.endDate;

        const experience = {
          icon: "solution",
          jobTitle: expElement.header,
          organizationName: expElement.subheader,
          duration: this.getExperienceDuration(startDate, endDate)
        };

        experienceInfo.push(experience);
      });
    }

    return [...experienceInfo];
  }

  getExperienceDuration(startDate, endDate) {
    const formatedStartDate = moment(startDate).format("ll");
    const formatedEndDate = moment(endDate).format("ll");

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

    const experienceInfo = this.getExperienceInfo(locale);

    return (
      <Card
        title={<FormattedMessage id="profile.experience" />}
        style={styles.card}
      >
        <Row>
          <Col xs={24} lg={24}>
            {this.generateExperienceInfoList(experienceInfo)}
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

export default injectIntl(ExperienceView);
