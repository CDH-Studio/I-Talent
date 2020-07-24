import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { Row, Avatar, List, Button } from "antd";
import { ContainerOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";

const ExperienceItem = ({ expand, item, toggleExpand }) => {
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

  const generateDescriptionBody = () => {
    const lineStrings = item.description.split(" ").join("\u00A0").split("\n");
    return lineStrings.map((line, index) => (
      <>
        {index > 0 ? <br /> : null} {line}
      </>
    ));
  };

  const generateDescriptionContent = () => {
    if (item.description && item.description.length > 0) {
      return (
        <>
          {expand && (
            <Row style={{ display: "block", overflowWrap: "anywhere" }}>
              <div>{generateDescriptionBody()}</div>
            </Row>
          )}
          <Row>
            <Button
              type="link"
              onClick={toggleExpand}
              style={styles.experienceDescriptionToggleTag}
            >
              {expand ? <UpOutlined /> : <DownOutlined />}
              <span style={styles.expandDescriptionToggleTagText}>
                <FormattedMessage id="profile.career.content.name" />
              </span>
            </Button>
          </Row>
        </>
      );
    }
    return null;
  };

  const generateDescription = () => {
    return (
      <>
        <Row>{item.organization}</Row>
        {generateDescriptionContent()}
      </>
    );
  };

  return (
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
        description={generateDescription()}
      />
    </List.Item>
  );
};

ExperienceItem.propTypes = {
  expand: PropTypes.bool.isRequired,
  item: PropTypes.shape({
    description: PropTypes.string,
    duration: PropTypes.string,
    icon: PropTypes.string,
    jobTitle: PropTypes.string,
    organization: PropTypes.string,
  }).isRequired,
  toggleExpand: PropTypes.func.isRequired,
};

export default ExperienceItem;
