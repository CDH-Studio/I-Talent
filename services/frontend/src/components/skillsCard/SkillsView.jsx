import PropTypes from "prop-types";
import { Tag, Empty, Row, Col } from "antd";
import { TagTwoTone } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { Fragment } from "react";

const SkillsView = ({ categoriesSkills, skills }) => {
  if (skills.length > 0)
    return categoriesSkills.map(
      (categorySkill) =>
        categorySkill != null && (
          <Fragment key={categorySkill.val}>
            <Row align="middle">
              <Col>
                <TagTwoTone twoToneColor="#3CBAB3" />
              </Col>
              <Col>{categorySkill.val}:</Col>
            </Row>
            <Row>
              <Col>
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
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={<FormattedMessage id="skills.empty" />}
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
