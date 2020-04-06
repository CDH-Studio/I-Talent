import React from "react";
import { Card, Tag, Row, Col, Collapse } from "antd";
import { TagTwoTone } from "@ant-design/icons";

const { Panel } = Collapse;

function SkillsView(props) {
  const styles = {
    cards: {
      borderWidth: "medium",
    },
  };
  const skills = props.skills;
  const categoriesSkills = props.categoriesSkills;

  return (
    <>
      <Collapse>
        {categoriesSkills.map(
          (categorySkill, index) =>
            categorySkill != null && (
              <Panel
                header={categorySkill.val}
                key={index + 1}
                extra={<TagTwoTone twoToneColor="#3CBAB3" />}
              >
                {skills[categorySkill.index].val.map((skill) => (
                  <Tag color="#007471">{skill}</Tag>
                ))}
              </Panel>
            )
        )}
      </Collapse>
    </>
  );
}

export default SkillsView;
