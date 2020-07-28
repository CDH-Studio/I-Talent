import React from "react";
import PropTypes from "prop-types";
import { Row, Col, List } from "antd";

const OfficialLanguageView = ({
  firstLanguageInfo,
  secondLanguageGradeInfo,
  secondLanguageDateInfo,
}) => {
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
};

OfficialLanguageView.propTypes = {
  firstLanguageInfo: PropTypes.isRequired,
  secondLanguageDateInfo: PropTypes.isRequired,
  secondLanguageGradeInfo: PropTypes.isRequired,
};

export default OfficialLanguageView;
