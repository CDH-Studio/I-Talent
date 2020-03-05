import React, { Component } from "react";
import { Typography, Tabs, List, Card, Tag } from "antd";
const { TabPane } = Tabs;
const { Paragraph } = Typography;

class SkillsView extends Component {
  render() {
    const { skills, categories } = this.props;

    return (
      <div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Skills" key="1">
            <List
              grid={{
                gutter: 18,
                xs: 3
                // sm: 2,
                // md: 4,
                // lg: 4,
                // xl: 6,
                // xxl: 3
              }}
              dataSource={categories}
              renderItem={category => (
                <List.Item>
                  <Card title={category.val}>
                    <div>
                      {
                        <List
                          dataSource={skills[category.index].val}
                          renderItem={skill => (
                            <List.Item>
                              <Tag>{skill}</Tag>
                            </List.Item>
                          )}
                        />
                      }
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane tab="Mentorship Skills" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Developmental Goals" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default SkillsView;
