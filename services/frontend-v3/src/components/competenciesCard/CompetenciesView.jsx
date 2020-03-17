import React, { Component } from "react";
import { Card, List, Tag, Row } from "antd";
import { FormattedMessage } from "react-intl";

class CompetenciesView extends Component {
  render() {
    const { competencies } = this.props;
    return (
      <div>
        <Card
          title={<FormattedMessage id="profile.competencies" />}
          id="competency"
        >
          <Row>
            <List>
              {Object.values(competencies).map(competency => (
                <Tag style={{ marginBottom: "8px", marginTop: "8px" }}>
                  {competency}
                </Tag>
              ))}
            </List>
          </Row>
        </Card>
      </div>
    );
  }
}

export default CompetenciesView;
