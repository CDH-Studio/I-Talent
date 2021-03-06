import { Fragment } from "react";
import PropTypes from "prop-types";
import { Tag, Empty, Row, Col } from "antd";
import { TagTwoTone } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";

const MentorshipView = ({ mentoringCategories, mentoring }) => {
  if (mentoring.length > 0)
    return mentoringCategories.map(
      (mentoringCategory) =>
        mentoringCategory != null && (
          <Fragment key={mentoringCategory.val}>
            <Row align="middle">
              <Col>
                <TagTwoTone twoToneColor="#3CBAB3" className="mr-1" />
              </Col>
              <Col>{mentoringCategory.val}:</Col>
            </Row>
            <Row>
              <Col>
                {mentoring[mentoringCategory.index].val.map((mentor) => (
                  <Tag color="#00605e" key={mentor}>
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
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={<FormattedMessage id="mentorship.empty" />}
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
