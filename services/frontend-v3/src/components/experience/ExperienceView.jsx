import React from "react";
import PropTypes from "prop-types";
import { Avatar, Row, Col, List, Empty } from "antd";
import { FormattedMessage } from "react-intl";
import { ContainerOutlined } from "@ant-design/icons";
import DescriptionText from "../descriptionText/DescriptionText";

const ExperienceView = ({ experienceInfo }) => {
  const styles = {
    avatar: {
      backgroundColor: "#007471",
    },
  };

  if (experienceInfo.length > 0) {
    return (
      <Row>
        <Col xs={24} lg={24}>
          <List
            itemLayout="vertical"
            dataSource={experienceInfo}
            renderItem={(item) => (
              <List.Item className="experience-item-list" extra={item.duration}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={styles.avatar}
                      size="large"
                      icon={<ContainerOutlined />}
                      shape="square"
                    />
                  }
                  title={item.jobTitle}
                  description={
                    <>
                      <Row>{item.organization}</Row>
                      <Row>
                        <Col>
                          <DescriptionText text={item.description} expandable />
                        </Col>
                      </Row>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    );
  }
  return (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={<FormattedMessage id="profile.experience.empty" />}
    />
  );
};

ExperienceView.propTypes = {
  experienceInfo: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      duration: PropTypes.string,
      icon: PropTypes.string,
      jobTitle: PropTypes.string,
      organization: PropTypes.string,
    })
  ).isRequired,
};

export default ExperienceView;
