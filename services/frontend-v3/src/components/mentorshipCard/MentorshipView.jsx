import React from "react";
import { Tag, Collapse, Empty } from "antd";
import { TagTwoTone } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";

const { Panel } = Collapse;

const MentorshipView = ({ mentoringCategories, mentoring }) => {
  /**
   * Generate Mentorship Collapse
   *
   * Generate a collapsible menu organized by mentorship skill category
   * If no skills are found for the profile then display friendly message
   */
  const generateMentorshipCollapse = () => {
    if (mentoring.length > 0) {
      return (
        <Collapse>
          {mentoringCategories.map(
            (mentoringCategory, index) =>
              mentoringCategory != null && (
                <Panel
                  header={mentoringCategory.val}
                  // eslint-disable-next-line react/no-array-index-key
                  key={index + 1}
                  extra={<TagTwoTone twoToneColor="#3CBAB3" />}
                >
                  {mentoring[mentoringCategory.index].val.map(
                    (mentor) => (
                      // eslint-disable-next-line react/no-array-index-key
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
    }
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={<FormattedMessage id="profile.mentorship.empty" />}
      />
    );
  };

  return generateMentorshipCollapse();
};

export default MentorshipView;
