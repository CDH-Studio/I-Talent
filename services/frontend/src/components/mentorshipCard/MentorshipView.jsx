import { Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { TagTwoTone } from "@ant-design/icons";
import { Col, Empty, Row, Tag } from "antd";
import PropTypes from "prop-types";

const MentorshipView = ({ mentoringCategories, mentoring }) => {
  if (mentoring.length > 0)
    return mentoringCategories.map(
      (mentoringCategory) =>
        mentoringCategory != null && (
          <Fragment key={mentoringCategory.val}>
            <Row>
              <Col className="mb-2">
                <div className="d-block">
                  <TagTwoTone
                    aria-hidden="true"
                    className="mr-1 d-inline"
                    twoToneColor="#3CBAB3"
                  />
                  <h4 className="mt-1 d-inline">{mentoringCategory.val}:</h4>
                </div>
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
  mentoring: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(
      PropTypes.shape({
        index: PropTypes.number,
        val: PropTypes.arrayOf(PropTypes.string),
      })
    ),
  ]),
  mentoringCategories: PropTypes.oneOfType([
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
  mentoring: undefined,
  mentoringCategories: undefined,
};

export default MentorshipView;
