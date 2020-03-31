import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import moment from "moment";

import { Row, Col, List } from "antd";

function OfficialLanguageView(props) {
  const generateFirstLanguage = dataSource => {
    return (
      <List
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    );
  };

  const generateSecondLanguageProficiency = dataSource => {
    return (
      <List
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    );
  };

  const firstLanguageInfo = props.firstLanguageInfo;

  const secondLanguageGradeInfo = props.secondLanguageGradeInfo;

  const secondLanguageDateInfo = props.secondLanguageDateInfo;

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

export default injectIntl(OfficialLanguageView);
