import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import moment from "moment";

import { Row, Col, Card, Avatar, List } from "antd";

class ExperienceView extends Component {
  generateExperienceInfoList(dataSource) {
    return (
      <List
        header={<FormattedMessage id="profile.experience" />}
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={item => (
          <List.Item extra={item.duration}>
            <List.Item.Meta
              avatar={
                <Avatar
                  style={{
                    backgroundColor: "#007471"
                  }}
                  size="large"
                  icon={item.icon}
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

    const experienceInfo = this.getExperienceInfo(locale);

    return (
      <Card style={{ height: "100%" }}>
        <Row>
          <Col xs={24} lg={24}>
            {this.generateExperienceInfoList(experienceInfo)}
          </Col>
        </Row>
      </Card>
    );
  }
}

export default injectIntl(ExperienceView);
