import { FormattedMessage } from "react-intl";
import {
  ContainerOutlined,
  FileDoneOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { Avatar, Empty, List, Tag } from "antd";
import PropTypes from "prop-types";

import "./ExperienceCardView.less";

const ExperienceCardView = ({ experienceInfo }) => {
  /**
   * Generate styled description text
   * @param {string} text - text to display as description
   * @returns {React.ReactElement} - React Element
   */
  const generateDescriptionBody = (text) =>
    text && (
      <div className="education-descriptionViewText my-2">
        <h5 className="visually-hidden">
          <FormattedMessage id="description" />
        </h5>
        {text}
      </div>
    );

  /**
   * Generate the supporting document links for the developmental goals
   * @param {object} SupportingLinks - Object describing the supporting documents
   * @param {string} SupportingLinks.id - Unique id the document
   * @param {string} SupportingLinks.url - URL to the document
   * @param {string} SupportingLinks.name - Name of the document type
   * @returns {React.ReactElement} - React Element
   */
  const generateSupportingLinks = (SupportingLinks) =>
    SupportingLinks &&
    SupportingLinks.length > 0 && (
      <>
        <div className="d-block">
          <LinkOutlined
            aria-hidden="true"
            className="mr-1 d-inline"
            style={{ color: "#3CBAB3" }}
          />
          <h5 className="mt-1 d-inline">
            <FormattedMessage id="attachment.links.employment" />
          </h5>
        </div>
        {SupportingLinks.map((link) => (
          <a href={link.url} rel="noopener noreferrer" target="_blank">
            <Tag key={link.id} color="#727272" style={{ cursor: "pointer" }}>
              <LinkOutlined aria-hidden="true" className="mr-1" />
              {link.name}
              <span className="screenReaderOnly">
                <FormattedMessage id="opens.in.new.tab" />
              </span>
            </Tag>
          </a>
        ))}
      </>
    );

  /**
   * Generate the list of projects
   * @param {Array.<string>} projects - list of project names
   * @returns {React.ReactElement} - React Element
   */
  const generateProjectsList = (projects) =>
    projects &&
    projects.length > 0 && (
      <div className="mb-1">
        <div className="d-block">
          <FileDoneOutlined
            aria-hidden="true"
            className="mr-1 d-inline"
            style={{ color: "#3CBAB3" }}
          />
          <h5 className="mt-1 d-inline">
            <FormattedMessage id="projects" />
          </h5>
        </div>
        {projects.map((i) => (
          <Tag key={i} color="#727272">
            <FileDoneOutlined aria-hidden="true" className="mr-1" />
            {i}
          </Tag>
        ))}
      </div>
    );

  if (experienceInfo && experienceInfo.length > 0) {
    return (
      <List
        dataSource={experienceInfo}
        itemLayout="vertical"
        renderItem={(item) => (
          <List.Item
            className="experience-item-list"
            extra={
              <>
                <h5 className="visually-hidden">
                  <FormattedMessage id="duration" />
                </h5>
                {item.duration}
              </>
            }
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  aria-hidden="true"
                  className="experience-avatar"
                  icon={<ContainerOutlined aria-hidden="true" />}
                  shape="square"
                  size="large"
                />
              }
              description={item.organization}
              title={item.jobTitle}
            />

            {item.description && generateDescriptionBody(item.description)}

            {item.projects && generateProjectsList(item.projects)}

            {item.attachmentLinks &&
              generateSupportingLinks(item.attachmentLinks)}
          </List.Item>
        )}
      />
    );
  }
  return (
    <Empty
      description={<FormattedMessage id="experience.empty" />}
      image={Empty.PRESENTED_IMAGE_SIMPLE}
    />
  );
};

ExperienceCardView.propTypes = {
  experienceInfo: PropTypes.arrayOf(
    PropTypes.shape({
      attachmentLinks: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string,
          url: PropTypes.string,
        })
      ),
      description: PropTypes.string,
      duration: PropTypes.string,
      jobTitle: PropTypes.string,
      organization: PropTypes.string,
      projects: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
};

export default ExperienceCardView;
