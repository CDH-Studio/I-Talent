import React from "react";

import { Row, Col, List } from "antd";

function OfficialLanguageView(props) {
  const generateFirstLanguage = (dataSource) => {
    return (
      <List
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    );
  };

  const generateSecondLanguageProficiency = (dataSource) => {
    return (
      <List
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    );
  };

  const { firstLanguageInfo } = props;

  const { secondLanguageGradeInfo } = props;

  const { secondLanguageDateInfo } = props;

  return (
    <>
      <Row>
        <Col xs={24} lg={12}>
          {generateFirstLanguage(firstLanguageInfo)}
        </Col>
      </Row>
      <Row>
        <Col xs={24} lg={12}>
          {generateSecondLanguageProficiency(secondLanguageGradeInfo)}
        </Col>
        <Col xs={24} lg={12}>
          {generateSecondLanguageProficiency(secondLanguageDateInfo)}
        </Col>
      </Row>
    </>
  );
}

export default OfficialLanguageView;
