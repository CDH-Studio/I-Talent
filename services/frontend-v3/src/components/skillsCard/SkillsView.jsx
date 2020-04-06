import React from "react";
import { Tag, Collapse, Empty } from "antd";

import { TagTwoTone } from "@ant-design/icons";

const { Panel } = Collapse;

function SkillsView(props) {
  /*
   * Generate Skills Collapse
   *
   * Generate a collapsible menu organized by skill category
   * If no skills are found for the profile then display friendly message
   */
  const generateSkillsCollapse = (categoriesSkills, skills) => {
    if (skills.length > 0) {
      return (
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
      );
    } else {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="no skills provided"
        />
      );
    }
  };

  return generateSkillsCollapse(props.categoriesSkills, props.skills);
}

export default SkillsView;
