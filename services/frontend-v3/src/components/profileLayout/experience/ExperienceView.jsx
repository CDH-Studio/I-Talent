import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";

import { Row, Col, Card, Typography, Avatar, List, Button } from "antd";
const { Title } = Typography;

class ExperienceView extends Component {
  render() {
    const { data, avatar } = this.props;

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
                    backgroundColor: this.props.avatar.color
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
        const experience = {
          icon: "bank",
          jobTitle: expElement.header,
          organizationName: expElement.subheader,
          duration:
            expElement.endDate === null
              ? expElement.startDate + " - " + expElement.endDate
              : expElement.startDate + " - " + "Present"
        };

        experienceInfo.push(experience);
      });
    }

    return [...experienceInfo];
  }
}

export default injectIntl(ExperienceView);
