import { Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { TagTwoTone } from "@ant-design/icons";
import { Col, Empty, Row } from "antd";
import PropTypes from "prop-types";

import TagList from "../tagList/TagList";

const MentorshipCardView = ({ mentorshipSkill, mentorshipSkillCategories }) => {
  if (
    mentorshipSkill &&
    mentorshipSkillCategories &&
    mentorshipSkillCategories.length > 0
  )
    return mentorshipSkillCategories.map((categoryName) => (
      <Fragment key={categoryName}>
        <Row>
          <Col className="mb-2">
            <div className="d-block">
              <TagTwoTone
                aria-hidden="true"
                className="mr-1 d-inline"
                twoToneColor="#3CBAB3"
              />
              <h4 className="mt-1 d-inline">{categoryName}:</h4>
            </div>
            <TagList data={mentorshipSkill[categoryName]} />
          </Col>
        </Row>
      </Fragment>
    ));

  return (
    <Empty
      description={<FormattedMessage id="mentorship.empty" />}
      image={Empty.PRESENTED_IMAGE_SIMPLE}
    />
  );
};

MentorshipCardView.propTypes = {
  mentorshipSkill: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        categoryId: PropTypes.string,
        key: PropTypes.string,
        label: PropTypes.string,
      })
    )
  ),
  mentorshipSkillCategories: PropTypes.arrayOf(PropTypes.string),
};

MentorshipCardView.defaultProps = {
  mentorshipSkill: undefined,
  mentorshipSkillCategories: undefined,
};

export default MentorshipCardView;
