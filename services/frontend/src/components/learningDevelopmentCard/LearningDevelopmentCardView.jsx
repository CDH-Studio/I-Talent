import { FormattedMessage } from "react-intl";
import { LinkOutlined, TagTwoTone } from "@ant-design/icons";
import { Col, Empty, Row } from "antd";
import { PropTypes } from "prop-types";

import TagList from "../tagList/TagList";

const LearningDevelopmentCardView = ({ devGoals, devAttachments }) => {
  /**
   * Generate the developmental goal tags for the profile
   * @param {object} DevelopmentalGoals - Object describing the developmental goals
   * @param {string} DevelopmentalGoals.id - Unique id for dev goal
   * @param {string} DevelopmentalGoals.name - Translated name of dev goal
   * @returns {React.ReactElement} - React Element
   */
  const generateDevelopmentalGoals = (DevelopmentalGoals) =>
    DevelopmentalGoals &&
    DevelopmentalGoals.length > 0 && (
      <Row className="mb-2">
        <Col>
          <div className="d-block">
            <TagTwoTone
              aria-hidden="true"
              className="mr-1 d-inline"
              twoToneColor="#3CBAB3"
            />
            <h4 className="mt-1 d-inline">
              <FormattedMessage id="developmental.goals" />:
            </h4>
          </div>
          <TagList data={DevelopmentalGoals} tagStyle="primary" />
        </Col>
      </Row>
    );

  /**
   * Generate the supporting document links for the developmental goals
   * @param {object} SupportingLinks - Object describing the supporting documents
   * @param {string} SupportingLinks.id - Unique id the document
   * @param {string} SupportingLinks.url - URL to the document
   * @param {object} SupportingLinks.name - Object describing of the document type
   * @param {object} SupportingLinks.name.name - Translated name of the document type
   * @param {string} SupportingLinks.name.id - Unique id the document type
   * @returns {React.ReactElement} - React Element
   */
  const generateSupportingLinks = (SupportingLinks) =>
    SupportingLinks &&
    SupportingLinks.length > 0 && (
      <Row className="mb-2">
        <Col>
          <div className="d-block">
            <LinkOutlined
              aria-hidden="true"
              className="mr-1 d-inline"
              style={{ color: "#3CBAB3" }}
            />
            <h4 className="mt-1 d-inline">
              <FormattedMessage id="supporting.document" />:
            </h4>
          </div>
          <TagList data={SupportingLinks} tagStyle="link" />
        </Col>
      </Row>
    );

  if (
    (devGoals && devGoals.length > 0) ||
    (devAttachments && devAttachments.length > 0)
  ) {
    return (
      <>
        {generateDevelopmentalGoals(devGoals)}
        {generateSupportingLinks(devAttachments)}
      </>
    );
  }

  return (
    <Empty
      description={<FormattedMessage id="developmental.goals.empty" />}
      image={Empty.PRESENTED_IMAGE_SIMPLE}
    />
  );
};

LearningDevelopmentCardView.propTypes = {
  devAttachments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      }),
      url: PropTypes.string,
    })
  ),
  devGoals: PropTypes.arrayOf(
    PropTypes.shape({
      categoryId: PropTypes.string,
      key: PropTypes.string,
      label: PropTypes.string,
    })
  ),
};

LearningDevelopmentCardView.defaultProps = {
  devAttachments: [],
  devGoals: [],
};

export default LearningDevelopmentCardView;
