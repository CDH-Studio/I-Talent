import React from "react";
import { Card, Tag, Row, Col, Collapse } from "antd";
import { TagTwoTone } from "@ant-design/icons";

const { Panel } = Collapse;

function MentorshipView(props) {
  const styles = {
    cards: {
      borderWidth: "medium",
    },
  };
  return (
    <>
      <Collapse>
        {props.mentoringCategories.map((mentoringCategory, index) => (
          <Panel
            header={mentoringCategory.val}
            key={index + 1}
            extra={<TagTwoTone twoToneColor="#3CBAB3" />}
          >
            {props.mentoring[mentoringCategory.index].val.map((mentor) => (
              <Tag color="#005a74">{mentor}</Tag>
            ))}
          </Panel>
        ))}
      </Collapse>
    </>
  );
}

export default MentorshipView;
