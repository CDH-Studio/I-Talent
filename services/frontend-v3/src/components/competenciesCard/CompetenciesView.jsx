import React, { Component } from "react";
import { List, Tag, Row } from "antd";

class CompetenciesView extends Component {
  render() {
    const { competencies } = this.props;
    return (
      <div>
        <Row>
          <List>
            {Object.values(competencies).map(competency => (
              <Tag style={{ marginBottom: "8px", marginTop: "8px" }}>
                {competency}
              </Tag>
            ))}
          </List>
        </Row>
      </div>
    );
  }
}

export default CompetenciesView;
