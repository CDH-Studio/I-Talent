import React from "react";
import { Tag, Collapse, Empty } from "antd";
import { TagTwoTone } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";

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
                  {skills[categorySkill.index].val.map((skill, index) => (
                    <Tag color="#007471" key={index}>
                      {skill}
                    </Tag>
                  ))}
                </Panel>
              )
          )}
        </Collapse>
      );
    }
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={<FormattedMessage id="profile.mentorship.empty" />}
      />
    );
  };

  return generateSkillsCollapse(props.categoriesSkills, props.skills);
}

export default SkillsView;
