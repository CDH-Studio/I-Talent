import { FormattedMessage } from "react-intl";
import { LinkOutlined, TagTwoTone } from "@ant-design/icons";
import { Col, Empty, Row } from "antd";
import { PropTypes } from "prop-types";

import TagList from "../tagList/TagList";

/**
 * Generate the developmental goal tags for the profile
 * @param {Object} props - component props
 * @param {Object[]} props.developmentalGoals[] - Object describing the developmental goals
 * @param {string} props.developmentalGoals[].id - Unique id for dev goal
 * @param {string} props.developmentalGoals[].name - Translated name of dev goal
 * @returns {React.ReactElement} - React Element
 */
// eslint-disable-next-line react/prop-types
const DevelopmentalGoals = ({ developmentalGoals = [] }) =>
  developmentalGoals.length > 0 && (
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
        <TagList data={developmentalGoals} tagStyle="primary" />
      </Col>
    </Row>
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
        <TagList data={supportingLinks} tagStyle="link" />
      </Col>
    </Row>
  );

const LearningDevelopmentCardView = ({ devGoals, devAttachments }) =>
  (devGoals && devGoals.length > 0) ||
  (devAttachments && devAttachments.length > 0) ? (
    <>
      <DevelopmentalGoals developmentalGoals={devGoals} />
      <SupportingLinks supportingLinks={devAttachments} />
    </>
  ) : (
    <Empty
      description={<FormattedMessage id="developmental.goals.empty" />}
      image={Empty.PRESENTED_IMAGE_SIMPLE}
    />
  );

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
