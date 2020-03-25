import React, { Component } from "react";
import { Card, Tag, Row, Col } from "antd";
import { FormattedMessage } from "react-intl";

class SkillsView extends Component {
  render() {
    const { skills, categoriesSkills } = this.props;

    return (
      <>
        <Row type="flex" gutter={[16, 16]}>
          {categoriesSkills.map(
            categorySkill =>
              categorySkill != null && (
                <Col style={{ marginLeft: "5px" }}>
                  <Card
                    size="small"
                    style={styles.cards}
                    title={categorySkill.val}
                  >
                    {skills[categorySkill.index].val.map(skill => (
                      <Row type="flex-wrap" gutter={[16, 4]} align={"left"}>
                        <Col span={6}>
                          <Tag color="#007471">{skill}</Tag>
                        </Col>
                      </Row>
                    ))}
                  </Card>
                </Col>
              )
          )}
        </Row>
      </>
    );
  }
}
const styles = {
  cards: {
    borderWidth: "medium"
  }
};

export default SkillsView;
