import React, { Component } from "react";
import { Card, List, Tag, Row } from "antd";
import { FormattedMessage } from "react-intl";

class DevelopmentalGoalsView extends Component {
  render() {
    const { devGoals } = this.props;
    return (
      <div>
        <Card title={<FormattedMessage id="profile.developmental.goals" />}>
          <Row>
            <List>
              {Object.values(devGoals).map(devGoal => (
                <Tag style={{ marginBottom: "8px", marginTop: "8px" }}>
                  {devGoal}
                </Tag>
              ))}
            </List>
          </Row>
        </Card>
      </div>
    );
  }
}

export default DevelopmentalGoalsView;
