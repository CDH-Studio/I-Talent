import React from "react";
import PropTypes from "prop-types";
import { Row, Col, List } from "antd";
import { FormattedMessage } from "react-intl";

const OfficialLanguageView = ({ firstLanguageInfo, secondLanguageInfo }) => {
  const styles = {
    subtitle: { fontWeight: "600", color: "rgba(0, 0, 0, 0.55)" },
  };

  const generateSecondaryLanguageTable = () => (
    <>
      <Row>
        {secondLanguageInfo.map((item) => (
          <Col style={styles.subtitle} span={8}>
            {item.gradeTitle}
          </Col>
        ))}
      </Row>
      <Row>
        {secondLanguageInfo.map((item) => (
          <Col span={8}>{item.grade}</Col>
        ))}
      </Row>
      <Row>
        {secondLanguageInfo.map((item) => (
          <Col style={styles.subtitle} span={8}>
            {item.dateTitle}
          </Col>
        ))}
      </Row>
      <Row>
        {secondLanguageInfo.map((item) => (
          <Col span={8}>{item.date}</Col>
        ))}
      </Row>
    </>
  );

  return (
    <Row>
      <Col span={6}>
        <List.Item.Meta
          title={firstLanguageInfo.title}
          description={firstLanguageInfo.description}
        />
      </Col>
      <Col span={18}>
        <List.Item.Meta
          title={<FormattedMessage id="profile.second.language.proficiency" />}
          description={generateSecondaryLanguageTable()}
        />
      </Col>
    </Row>
  );
};

OfficialLanguageView.propTypes = {
  firstLanguageInfo: PropTypes.PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.element])
  ).isRequired,
  secondLanguageInfo: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    )
  ).isRequired,
};

export default OfficialLanguageView;
