import React from "react";
import { Tag, Collapse, Empty } from "antd";
import { TagTwoTone } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";

const { Panel } = Collapse;

function MentorshipView(props) {
  /*
   * Generate Mentorship Collapse
   *
   * Generate a collapsible menu organized by mentorship skill category
   * If no skills are found for the profile then display friendly message
   */
  const generateMentorshipCollapse = (mentoringCategories, mentoringSkills) => {
    if (mentoringSkills.length > 0) {
      return (
        <Collapse>
          {mentoringCategories.map(
            (mentoringCategory, index) =>
              mentoringCategory != null && (
                <Panel
                  header={mentoringCategory.val}
                  key={index + 1}
                  extra={<TagTwoTone twoToneColor="#3CBAB3" />}
                >
                  {mentoringSkills[mentoringCategory.index].val.map(
                    (mentor) => (
                      <Tag color="#005a74" key={index}>
                        {mentor}
                      </Tag>
                    )
                  )}
                </Panel>
              )
          )}
        </Collapse>
      );
    } else {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={<FormattedMessage id="profile.mentorship.empty" />}
        />
      );
    }
  };

  return generateMentorshipCollapse(props.mentoringCategories, props.mentoring);
}

export default MentorshipView;
