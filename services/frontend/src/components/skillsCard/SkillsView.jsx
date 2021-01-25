import PropTypes from "prop-types";
import { Tag, Empty, Row, Col } from "antd";
import { FormattedMessage } from "react-intl";

const SkillsView = ({ categoriesSkills, skills }) => {
  if (skills.length > 0)
    return (
      <>
        {categoriesSkills.map(
          (categorySkill) =>
            categorySkill != null && (
              <Row align="middle">
                <Col>
                  <FormattedMessage id={categorySkill.val} />:
                </Col>
                <Col>
                  {skills[categorySkill.index].val.map((skill) => (
                    <Tag color="#00605e">{skill}</Tag>
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
