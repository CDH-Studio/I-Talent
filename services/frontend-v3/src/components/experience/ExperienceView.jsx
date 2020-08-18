import React from "react";
import PropTypes from "prop-types";
import { Avatar, Row, Col, List, Empty, Tag } from "antd";
import { FormattedMessage } from "react-intl";
import { ContainerOutlined, LinkOutlined } from "@ant-design/icons";
import DescriptionText from "../descriptionText/DescriptionText";

const ExperienceView = ({ experienceInfo }) => {
  const styles = {
    avatar: {
      backgroundColor: "#007471",
    },
  };
  const getUrl = (item) => {
    if (item.attachmentLinks && item.attachmentLinks.length > 0)
      return item.attachmentLinks.map((i) => (
        <Tag color="rgb(114, 114, 114)" key={i.id}>
          <LinkOutlined />
          <a target="_blank" rel="noreferrer" href={i.url}>
            {i.name}
          </a>
        </Tag>
      ));
    return undefined;
  };

  const generateOrganizationItemDescription = (item) => (
    <>
      <Row>
        <Col>{item.organization}</Col>
      </Row>
      <Row>
        <Col>
          <DescriptionText text={item.description} expandable />
        </Col>
      </Row>
      {getUrl(item)}
    </>
  );

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
                  description={generateOrganizationItemDescription(item)}
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
