import { Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { TagTwoTone } from "@ant-design/icons";
import { Col, Empty, Row, Tag } from "antd";
import PropTypes from "prop-types";

const SkillsView = ({ categoriesSkills, skills }) => {
  if (skills.length > 0)
    return categoriesSkills.map(
      (categorySkill) =>
        categorySkill != null && (
          <Fragment key={categorySkill.val}>
            <Row>
              <Col className="mb-2">
                <div className="d-block">
                  <TagTwoTone
                    aria-hidden="true"
                    className="mr-1 d-inline"
                    twoToneColor="#3CBAB3"
                  />
                  <h4 className="mt-1 d-inline">{categorySkill.val}:</h4>
                </div>
                {skills[categorySkill.index].val.map((skill) => (
                  <Tag key={skill} color="#00605e">
                    {skill}
                  </Tag>
                ))}
              </Col>
            </Row>
          </Fragment>
        )
    );

  return (
    <Empty
      description={<FormattedMessage id="skills.empty" />}
      image={Empty.PRESENTED_IMAGE_SIMPLE}
    />
  );
};

SkillsView.propTypes = {
  categoriesSkills: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(
      PropTypes.shape({
        index: PropTypes.number,
        val: PropTypes.arrayOf(PropTypes.string),
      })
    ),
  ]),
  skills: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(
      PropTypes.shape({
        index: PropTypes.number,
        val: PropTypes.arrayOf(PropTypes.string),
      })
    ),
  ]),
};

SkillsView.defaultProps = {
  categoriesSkills: undefined,
  skills: undefined,
};
export default SkillsView;
