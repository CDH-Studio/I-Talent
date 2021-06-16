import { Fragment } from "react";
import PropTypes from "prop-types";
import { Avatar, Row, Col, List, Empty, Tag } from "antd";
import { FormattedMessage } from "react-intl";
import { ContainerOutlined, LinkOutlined } from "@ant-design/icons";
import "./ExperienceView.less";

const ExperienceView = ({ experienceInfo }) => {
  const generateDescriptionBody = (text) => {
    if (text) {
      const lineStrings = text.split(" ").join("\u00A0").split("\n");
      return (
        <div className="bodyStyle">
          {lineStrings.map((line, index) => (
            <Fragment key={line}>
              {index > 0 ? <br /> : null} {line}
            </Fragment>
          ))}
        </div>
      );
    }
    return undefined;
  };
  const getUrl = (item) => {
    if (item.attachmentLinks && item.attachmentLinks.length > 0)
      return item.attachmentLinks.map((i) => (
        <a target="_blank" rel="noopener noreferrer" href={i.url}>
          <Tag color="#727272" key={i.id} style={{ cursor: "pointer" }}>
            <LinkOutlined />
            <span>{i.name}</span>
          </Tag>
        </a>
      ));
    return undefined;
  };

  const getProjects = (item) => {
    if (item.projects && item.projects.length > 0)
      return item.projects.map((i) => (
        <Tag color="#727272" key={i}>
          <span>{i}</span>
        </Tag>
      ));
    return undefined;
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
                      className="avatar"
                      size="large"
                      icon={<ContainerOutlined />}
                      shape="square"
                    />
                  }
                  title={`${item.jobTitle} - (${item.organization})`}
                  description={
                    <>
                      <Row>
                        <Col>{generateDescriptionBody(item.description)}</Col>
                      </Row>

                      {item.projects && item.projects.length > 0 && (
                        <Row align="middle">
                          <Col>
                            <FormattedMessage id="projects" />:
                          </Col>
                          <Col>{getProjects(item)}</Col>
                        </Row>
                      )}

                      {item.attachmentLinks && item.attachmentLinks.length > 0 && (
                        <Row align="middle">
                          <Col>
                            <FormattedMessage id="attachment.links" />:
                          </Col>
                          <Col>{getUrl(item)}</Col>
                        </Row>
                      )}
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
      description={<FormattedMessage id="experience.empty" />}
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
