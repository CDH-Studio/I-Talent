import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";

import { Row, Col, Card, List, Tag } from "antd";

class ProjectsView extends Component {
  generateProjectsInfoList(dataSource) {
    return (
      <List
        header={<FormattedMessage id="profile.projects" />}
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={item => (
          <List.Item>
            <Tag>{item.projectDescription}</Tag>
          </List.Item>
        )}
      />
    );
  }

  getProjectsInfo(locale) {
    const data = this.props.data;

    let projectsInfo = [];
    if (data.projects != null) {
      data.projects.forEach(projectElement => {
        const projects = {
          icon: "team",
          projectDescription: projectElement.text
        };
        projectsInfo.push(projects);
      });
    }

    return [...projectsInfo];
  }

  render() {
    const locale = this.props.intl.formatMessage({ id: "language.code" });

    const projectsInfo = this.getProjectsInfo(locale);

    return (
      <Card style={{ height: "100%" }}>
        <Row>
          <Col xs={24} lg={24}>
            {this.generateProjectsInfoList(projectsInfo)}
          </Col>
        </Row>
      </Card>
    );
  }
}

export default injectIntl(ProjectsView);
