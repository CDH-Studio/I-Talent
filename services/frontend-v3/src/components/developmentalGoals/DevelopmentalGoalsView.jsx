import React, { Component } from "react";
import { Card, List, Tag, Row } from "antd";
import { FormattedMessage } from "react-intl";

class DevelopmentalGoalsView extends Component {
  render() {
    const { devGoals } = this.props;
    return (
      <div>
        <Row>
          <List>
            {Object.values(devGoals).map(devGoal => (
              <Tag style={{ marginBottom: "8px", marginTop: "8px" }}>
                {devGoal}
              </Tag>
            ))}
          </List>
        </Row>
      </div>
    );
  }
}

export default DevelopmentalGoalsView;
