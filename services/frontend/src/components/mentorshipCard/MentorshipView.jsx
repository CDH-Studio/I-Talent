import { TagTwoTone } from "@ant-design/icons";
import { Col, Empty, Row, Tag } from "antd";
import PropTypes from "prop-types";
import { Fragment } from "react";
import { FormattedMessage } from "react-intl";

const MentorshipView = ({ mentoringCategories, mentoring }) => {
  if (mentoring.length > 0)
    return mentoringCategories.map(
      (mentoringCategory) =>
        mentoringCategory != null && (
          <Fragment key={mentoringCategory.val}>
            <Row align="middle">
              <Col>
                <TagTwoTone className="mr-1" twoToneColor="#3CBAB3" />
              </Col>
              <Col>{mentoringCategory.val}:</Col>
            </Row>
            <Row>
              <Col>
                {mentoring[mentoringCategory.index].val.map((mentor) => (
                  <Tag key={mentor} color="#00605e">
                    {mentor}
                  </Tag>
                ))}
              </Col>
            </Row>
          </Fragment>
        )
    );

  return (
    <Empty
      description={<FormattedMessage id="mentorship.empty" />}
      image={Empty.PRESENTED_IMAGE_SIMPLE}
    />
  );
};

MentorshipView.propTypes = {
  mentoringCategories: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(
      PropTypes.shape({
        index: PropTypes.number,
        val: PropTypes.arrayOf(PropTypes.string),
      })
    ),
  ]),
  mentoring: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(
      PropTypes.shape({
        index: PropTypes.number,
        val: PropTypes.arrayOf(PropTypes.string),
      })
    ),
  ]),
};

MentorshipView.defaultProps = {
  mentoringCategories: undefined,
  mentoring: undefined,
};

export default MentorshipView;
