import React, { Component } from "react";
import { Tabs, Card, Tag, Row, Col } from "antd";
const { TabPane } = Tabs;

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
                  <Col style={{ marginLeft: "5px" }}>
                    <Card
                      style={{ boxShadow: "0 0 5px #ccc" }}
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
                ))}
              </Row>
            </TabPane>
            <TabPane tab="Mentorship Skills" key="2">
              <Row type="flex" gutter={[16, 16]}>
                {categoriesMentor.map(categoryMentor => (
                  <Col style={{ marginLeft: "5px" }}>
                    <Card
                      style={{ boxShadow: "0 0 5px #ccc" }}
                      title={categoryMentor.val}
                    >
                      {mentoring[categoryMentor.index].val.map(mentor => (
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
            </TabPane>
          </Tabs>
        </Card>
      </div>
    );
  }
}

export default SkillsView;
