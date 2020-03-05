import React, { Component } from "react";
import { Typography, Tabs, List, Card, Tag, Row, Col } from "antd";
const { TabPane } = Tabs;
const { Paragraph } = Typography;

class SkillsView extends Component {
  render() {
    const {
      skills,
      mentoring,
      categoriesSkills,
      categoriesMentor
    } = this.props;

    return (
      <div>
        <Card>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Skills" key="1">
              <Row type="flex" gutter={[16, 16]}>
                {categoriesSkills.map(categorySkill => (
                  <Col span={6}>
                    <Card title={categorySkill.val}>
                      {skills[categorySkill.index].val.map(skill => (
                        <Row
                          type="flex-wrap"
                          gutter={[16, 16]}
                          align={"center"}
                        >
                          <Col span={16}>
                            <Tag>{skill}</Tag>
                          </Col>
                        </Row>
                      ))}
                    </Card>
                  </Col>
                ))}
              </Row>
            </TabPane>
            <TabPane tab="Mentorship Skills" key="2">
              <Row type="flex" gutter={[16, 16]}>
                {categoriesMentor.map(categoryMentor => (
                  <Col span={6}>
                    <Card title={categoryMentor.val}>
                      {mentoring[categoryMentor.index].val.map(mentor => (
                        <Row type="wrap" gutter={[16, 16]} align={"center"}>
                          <Col span={16}>
                            <Tag>{mentor}</Tag>
                          </Col>
                        </Row>
                      ))}
                    </Card>
                  </Col>
                ))}
              </Row>
            </TabPane>
          </Tabs>
        </Card>
      </div>
    );
  }
}

export default SkillsView;
