import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import { Row, Avatar, List } from "antd";
import { ContainerOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";

const ExperienceItem = ({ expand, item, toggleExpand, intl }) => {
  const styles = {
    avatar: {
      backgroundColor: "#007471",
    },
    experienceDescription: {
      color: "rgba(0, 0, 0, 0.85)",
      maxWidth: "525px",
      paddingTop: "6px",
    },
    experienceDescriptionToggleTag: {
      color: "rgba(0, 0, 0, 0.85)",
      paddingTop: "8px",
    },
    expandDescriptionToggleTagText: {
      paddingLeft: "5px",
    },
  };

  const generateDescriptionContent = () => {
    if (expand) {
      return (
        <Row>
          <p style={styles.experienceDescription}>{item.description}</p>
        </Row>
      );
    }
    return null;
  };

  const generateDescription = () => {
    return (
      <>
        <Row>{item.organizationName}</Row>
        {generateDescriptionContent()}
        <Row>
          <a
            href={false}
            onClick={toggleExpand}
            style={styles.experienceDescriptionToggleTag}
          >
            {expand ? <UpOutlined /> : <DownOutlined />}
            <span style={styles.expandDescriptionToggleTagText}>
              {intl.formatMessage({
                id: "profile.career.content.name",
                defaultMessage: "Description",
              })}
            </span>
          </a>
        </Row>
      </>
    );
  };

  return (
    <List.Item extra={item.duration}>
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
        description={generateDescription()}
      />
    </List.Item>
  );
};

ExperienceItem.propTypes = {
  expand: PropTypes.bool.isRequired,
  item: PropTypes.isRequired,
  toggleExpand: PropTypes.func.isRequired,
  intl: PropTypes.isRequired,
};

export default injectIntl(ExperienceItem);
