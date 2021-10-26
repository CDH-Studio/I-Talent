import { FormattedMessage } from "react-intl";
import {
  ContainerOutlined,
  FileDoneOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { Avatar, Empty, List } from "antd";
import PropTypes from "prop-types";

import TagList from "../tagList/TagList";

import "./ExperienceCardView.less";

/**
 * Generate styled description text
 * @param {Object} props - component props
 * @param {string} text - text to display as description
 * @returns {React.ReactElement} - React Element
 */
// eslint-disable-next-line react/prop-types
const DescriptionBody = ({ text }) =>
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
 * @param {Object} props - component props
 * @param {Object[]} props.supportingLinks - Object describing the supporting link
 * @param {string} props.supportingLinks[].id - Unique id of the supporting link
 * @param {string} props.supportingLinks[].url - URL to the supporting link
 * @param {string} props.supportingLinks[].name - Name of the supporting link type
 * @returns {React.ReactElement} - React Element
 */
// eslint-disable-next-line react/prop-types
const SupportingLinks = ({ supportingLinks = [] }) =>
  supportingLinks.length > 0 && (
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
      <TagList data={supportingLinks} tagStyle="link" />
    </>
  );

/**
 * Generate the list of projects
 * @param {Object} props - component props
 * @param {Array.<string>} props.projects - list of project names
 * @returns {React.ReactElement} - React Element
 */
// eslint-disable-next-line react/prop-types
const ProjectsList = ({ projects = [] }) =>
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
      <TagList data={projects} tagStyle="secondary" />
    </div>
  );

const ExperienceCardView = ({ experienceInfo }) =>
  experienceInfo && experienceInfo.length > 0 ? (
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

          <DescriptionBody text={item.description} />
          <ProjectsList projects={item.projects} />
          <SupportingLinks supportingLinks={item.attachmentLinks} />
        </List.Item>
      )}
    />
  ) : (
    <Empty
      description={<FormattedMessage id="experience.empty" />}
      image={Empty.PRESENTED_IMAGE_SIMPLE}
    />
  );

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
      projects: PropTypes.arrayOf(
        PropTypes.shape({
          icon: PropTypes.node,
          key: PropTypes.string,
          label: PropTypes.node,
        })
      ),
    })
  ).isRequired,
};

export default ExperienceCardView;
