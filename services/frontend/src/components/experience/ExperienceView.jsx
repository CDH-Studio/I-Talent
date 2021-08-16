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
        <a href={i.url} rel="noopener noreferrer" target="_blank">
          <Tag key={i.id} color="#727272" style={{ cursor: "pointer" }}>
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
        <Tag key={i} color="#727272">
          <span>{i}</span>
        </Tag>
      ));
    return undefined;
  };

  if (experienceInfo.length > 0) {
    return (
      <Row>
        <Col lg={24} xs={24}>
          <List
            dataSource={experienceInfo}
            itemLayout="vertical"
            renderItem={(item) => (
              <List.Item className="experience-item-list" extra={item.duration}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      className="avatar"
                      icon={<ContainerOutlined />}
                      shape="square"
                      size="large"
                    />
                  }
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
                            <FormattedMessage id="attachment.links.employment" />
                            :
                          </Col>
                          <Col>{getUrl(item)}</Col>
                        </Row>
                      )}
                    </>
                  }
                  title={`${item.jobTitle} - (${item.organization})`}
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
      description={<FormattedMessage id="experience.empty" />}
      image={Empty.PRESENTED_IMAGE_SIMPLE}
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
