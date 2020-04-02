import React, { Component } from "react";
import { Card, Tag, Row, Col } from "antd";

function SkillsView(props) {
  const styles = {
    cards: {
      borderWidth: "medium"
    }
  };
  const skills = props.skills;
  const categoriesSkills = props.categoriesSkills;

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

export default SkillsView;
