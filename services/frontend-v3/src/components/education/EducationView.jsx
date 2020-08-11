import React from "react";
import { Row, Col, Avatar, List, Empty } from "antd";
import { BankOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";

import DescriptionText from "../descriptionText/DescriptionText";

const EducationView = ({ educationInfo }) => {
  /* Component Styles */
  const styles = {
    card: {
      height: "100%",
    },
    avatar: {
      backgroundColor: "#007471",
    },
  };

  const generateEducationItemDescription = (item) => (
    <>
      <Row>
        <Col>{item.school}</Col>
      </Row>
      <Row>
        <Col>
          <DescriptionText text={item.description} expandable />
        </Col>
      </Row>
    </>
  );

  const generateEducationInfoList = (dataSource) => {
    return (
      <List
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={(item) => (
          <List.Item extra={item.duration}>
            <List.Item.Meta
              avatar={
                <Avatar
                  style={styles.avatar}
                  size="large"
                  icon={<BankOutlined />}
                  shape="square"
                />
              }
              title={item.diploma}
              description={generateEducationItemDescription(item)}
            />
          </List.Item>
        )}
      />
    );
  };
  if (educationInfo.length > 0) {
    return (
      <Row>
        <Col xs={24} lg={24}>
          {generateEducationInfoList(educationInfo)}
        </Col>
      </Row>
    );
  }
  return (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={<FormattedMessage id="profile.education.empty" />}
    />
  );
};

EducationView.propTypes = {
  educationInfo: PropTypes.arrayOf(
    PropTypes.shape({
      diploma: PropTypes.string,
      school: PropTypes.string,
      duration: PropTypes.string,
    })
  ).isRequired,
};

export default EducationView;
