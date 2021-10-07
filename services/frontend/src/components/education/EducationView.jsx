import { FormattedMessage } from "react-intl";
import { BankOutlined, LinkOutlined } from "@ant-design/icons";
import { Avatar, Empty, List, Tag } from "antd";
import PropTypes from "prop-types";

import "./EducationView.less";

const EducationView = ({ educationInfo }) => {
  /**
   * Generate styled description text
   * @param {string} text - text to display as description
   * @returns {HTMLElement} - HTML markup
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
   * @returns {HTMLElement} - HTML markup
   */
  const generateSupportingLinks = (SupportingLinks) =>
    SupportingLinks &&
    SupportingLinks.length > 0 && (
      <>
        <h5 className="visually-hidden">
          <FormattedMessage id="attachment.links.education" />
        </h5>
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

  if (educationInfo && educationInfo.length > 0) {
    return (
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
            {educationItem.description &&
              generateDescriptionBody(educationItem.description)}

            {educationItem.attachmentLinks &&
              generateSupportingLinks(educationItem.attachmentLinks)}
          </List.Item>
        )}
      />
    );
  }
  return (
    <Empty
      description={<FormattedMessage id="education.empty" />}
      image={Empty.PRESENTED_IMAGE_SIMPLE}
    />
  );
};

EducationView.propTypes = {
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

export default EducationView;
