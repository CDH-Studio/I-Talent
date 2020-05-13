/* eslint-disable no-shadow */
import React from "react";
import PropTypes from "prop-types";
import { Tag, Collapse, Empty } from "antd";
import { TagTwoTone } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";

const { Panel } = Collapse;

function SkillsView({ categoriesSkills, skills }) {
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
                  // eslint-disable-next-line react/no-array-index-key
                  key={index + 1}
                  extra={<TagTwoTone twoToneColor="#3CBAB3" />}
                >
                  {skills[categorySkill.index].val.map((skill, indexTag) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Tag color="#007471" key={indexTag}>
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

  return generateSkillsCollapse(categoriesSkills, skills);
}

SkillsView.propTypes = {
  categoriesSkills: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(
      PropTypes.shape({
        index: PropTypes.number,
        val: PropTypes.arrayOf(PropTypes.string),
      })
    ),
  ]),
  skills: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(
      PropTypes.shape({
        index: PropTypes.number,
        val: PropTypes.arrayOf(PropTypes.string),
      })
    ),
  ]),
};

SkillsView.defaultProps = {
  categoriesSkills: undefined,
  skills: undefined,
};
export default SkillsView;
