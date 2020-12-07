import PropTypes from "prop-types";
import { Avatar, Row, Col, List, Empty, Tag, Descriptions } from "antd";
import { FormattedMessage } from "react-intl";
import { ContainerOutlined, LinkOutlined } from "@ant-design/icons";
import "./ExperienceView.less";

const ExperienceView = ({ experienceInfo }) => {
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
        <Tag color="#727272" key={i.id}>
          <span>{i}</span>
        </Tag>
      ));
    return undefined;
  };

  const generateOrganizationItemDescription = (item) => (
    <>
      <Row>
        <Col>
          <Descriptions.Item>{item.description}</Descriptions.Item>
        </Col>
      </Row>

      {item.projects && item.projects.length > 0 && (
        <Row align="middle">
          <Col>
            <FormattedMessage id="setup.projects" />:
          </Col>
          <Col>{getProjects(item)}</Col>
        </Row>
      )}

      {item.attachmentLinks && item.attachmentLinks.length > 0 && (
        <Row align="middle">
          <Col>
            <FormattedMessage id="setup.attachment" />:
          </Col>
          <Col>{getUrl(item)}</Col>
        </Row>
      )}
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
                      className="avatar"
                      size="large"
                      icon={<ContainerOutlined />}
                      shape="square"
                    />
                  }
                  title={`${item.jobTitle} - (${item.organization})`}
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
