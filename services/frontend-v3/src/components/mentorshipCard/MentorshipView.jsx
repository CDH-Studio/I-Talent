import React from "react";
import { Card, Tag, Row, Col } from "antd";

function MentorshipView(props) {
  const styles = {
    cards: {
      borderWidth: "medium"
    }
  };
  return (
    <>
      <Row type="flex" gutter={[16, 16]}>
        {props.mentoringCategories.map(mentoringCategory => (
          <Col style={{ marginLeft: "5px" }}>
            <Card
              size="small"
              style={styles.cards}
              title={mentoringCategory.val}
            >
              {props.mentoring[mentoringCategory.index].val.map(mentor => (
                <Row type="flex-wrap" gutter={[16, 4]} align={"left"}>
                  <Col span={6}>
                    <Tag color="#007471">{mentor}</Tag>
                  </Col>
                </Row>
              ))}
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default MentorshipView;
