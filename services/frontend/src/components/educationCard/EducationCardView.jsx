import { FormattedMessage } from "react-intl";
import { BankOutlined } from "@ant-design/icons";
import { Avatar, Empty, List } from "antd";
import PropTypes from "prop-types";

import TagList from "../tagList/TagList";

import "./EducationCardView.less";

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
      <h5 className="visually-hidden">
        <FormattedMessage id="attachment.links.education" />
      </h5>
      <TagList data={supportingLinks} tagStyle="link" />
    </>
  );

const EducationCardView = ({ educationInfo }) =>
  educationInfo && educationInfo.length > 0 ? (
    <List
      dataSource={educationInfo}
      itemLayout="vertical"
      renderItem={(educationItem) => (
        <List.Item
          className="education-item-list"
          extra={
            <>
              <h5 className="visually-hidden">
                <FormattedMessage id="duration" />
              </h5>
              {educationItem.duration}
            </>
          }
        >
          <List.Item.Meta
            avatar={
              <Avatar
                aria-hidden="true"
                className="education-avatar"
                icon={<BankOutlined aria-hidden="true" />}
                shape="square"
                size="large"
              />
            }
            description={educationItem.school}
            title={educationItem.diploma}
          />
          <DescriptionBody text={educationItem.description} />
          <SupportingLinks supportingLinks={educationItem.attachmentLinks} />
        </List.Item>
      )}
    />
  ) : (
    <Empty
      description={<FormattedMessage id="education.empty" />}
      image={Empty.PRESENTED_IMAGE_SIMPLE}
    />
  );

EducationCardView.propTypes = {
  educationInfo: PropTypes.arrayOf(
    PropTypes.shape({
      attachmentLinks: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string,
          url: PropTypes.string,
        })
      ),
      description: PropTypes.string,
      diploma: PropTypes.string,
      duration: PropTypes.string,
      school: PropTypes.string,
    })
  ).isRequired,
};

export default EducationCardView;
