import PropTypes from "prop-types";
import { Tag, Empty, Row, Col } from "antd";
import { FormattedMessage } from "react-intl";

const MentorshipView = ({ mentoringCategories, mentoring }) => {
  if (mentoring.length > 0)
    return (
      <>
        {mentoringCategories.map(
          (mentoringCategory) =>
            mentoringCategory != null && (
              <Row align="middle">
                <Col>
                  <FormattedMessage id={mentoringCategory.val} />:
                </Col>
                <Col>
                  {mentoring[mentoringCategory.index].val.map((mentor) => (
                    <Tag color="#00605e">{mentor}</Tag>
                  ))}
                </Col>
              </Row>
            )
        )}
      </>
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
