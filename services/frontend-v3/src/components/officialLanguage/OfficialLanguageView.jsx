import React from "react";
import PropTypes from "prop-types";
import { Row, Col, List } from "antd";

const OfficialLanguageView = ({ firstLanguageInfo, secondLanguageInfo }) => {
  const style = { title: { fontWeight: "bold" } };

  return (
    <List
      dataSource={[
        { title: firstLanguageInfo.title, body: firstLanguageInfo.description },
        ...secondLanguageInfo.map((item) => ({
          title: item.title,
          body: (
            <div>
              <div>{item.grade}</div>
              <div>{item.date}</div>
            </div>
          ),
        })),
      ]}
      grid={{ gutter: 16, column: 4 }}
      renderItem={(item) => (
        <List.Item>
          <div style={style.title}>{item.title}</div>
          {item.body}
        </List.Item>
      )}
    />
  );

  /*const generateFirstLanguage = (dataSource) => {
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
  );*/
};

OfficialLanguageView.propTypes = {
  firstLanguageInfo: PropTypes.isRequired,
  secondLanguageDateInfo: PropTypes.isRequired,
  secondLanguageGradeInfo: PropTypes.isRequired,
};

export default OfficialLanguageView;
