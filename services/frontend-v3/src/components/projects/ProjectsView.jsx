import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";

import { Row, Col, Card, List } from "antd";

class ProjectsView extends Component {
  generateProjectsInfoList(dataSource) {
    return (
      <List
        size="small"
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={item => <List.Item>{item.projectDescription}</List.Item>}
      />
    );
  }

  getProjectsInfo(locale) {
    const data = this.props.data;

    let projectsInfo = [];
    if (data.projects != null) {
      data.projects.forEach(projectElement => {
        const projects = {
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
      <Row>
        <Col xs={24} lg={24}>
          {this.generateProjectsInfoList(projectsInfo)}
        </Col>
      </Row>
    );
  }
}

/* Component Styles */
const styles = {
  card: {
    height: "100%"
  }
};

export default injectIntl(ProjectsView);
