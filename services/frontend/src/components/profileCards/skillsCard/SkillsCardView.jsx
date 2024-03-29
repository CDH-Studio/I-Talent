import { Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { TagTwoTone } from "@ant-design/icons";
import { Col, Empty, Row } from "antd";
import PropTypes from "prop-types";

import TagList from "../../tagList/TagList";

const SkillsCardView = ({ skillCategories, skills }) =>
  skills && skillCategories && skillCategories.length > 0 ? (
    skillCategories.map((categoryName) => (
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
            <TagList data={skills[categoryName]} tagStyle="primary" />
          </Col>
        </Row>
      </Fragment>
    ))
  ) : (
    <Empty
      description={<FormattedMessage id="skills.empty" />}
      image={Empty.PRESENTED_IMAGE_SIMPLE}
    />
  );

SkillsCardView.propTypes = {
  skillCategories: PropTypes.arrayOf(PropTypes.string),
  skills: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        categoryId: PropTypes.string,
        key: PropTypes.string,
        label: PropTypes.string,
      })
    )
  ),
};

SkillsCardView.defaultProps = {
  skillCategories: undefined,
  skills: undefined,
};
export default SkillsCardView;
