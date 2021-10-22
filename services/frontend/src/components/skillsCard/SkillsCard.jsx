import { useMemo } from "react";
import { useIntl } from "react-intl";
import { has } from "lodash";
import PropTypes from "prop-types";

import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";
import SkillsCardView from "./SkillsCardView";

const SkillsCard = ({ data, editableCardBool }) => {
  const intl = useIntl();

  /**
   * Format skills list into categories
   * @param {Object[]} skillsList - Object describing the categorized skills list
   * @param {string} skillsList[].category - Skill category name
   * @param {string} skillsList[].categoryId - id of the skill's category
   * @param {string} skillsList[].id - id of the skill
   * @param {string} skillsList[].name - name of the skill
   * @returns {Object} - Object describing the categorized skills list
   */
  const categorizeSkills = (skillsList) => {
    const categorizedList = {};

    if (skillsList) {
      skillsList.forEach((skill) => {
        const key = skill.category;

        if (!has(categorizedList, key)) {
          categorizedList[key] = [];
        }

        categorizedList[key].push({
          categoryId: skill.categoryId,
          key: skill.id,
          label: skill.name,
        });
      });
    }
    return categorizedList;
  };

  /**
   * Extract the skill categories from skills object
   * @param {Object} formattedSkills - Object describing the categorized skills list
   * @returns {Array<string>} - Array of skill categories
   */
  const getSkillCategories = (formattedSkills) => Object.keys(formattedSkills);

  const formattedSkills = useMemo(() => categorizeSkills(data.skills), [data]);
  const skillCategories = getSkillCategories(formattedSkills);

  return (
    <ProfileCards
      cardName="skills"
      data={data}
      editableCardBool={editableCardBool}
      editUrl="/profile/edit/talent?tab=skills"
      id="card-profile-skills"
      lastUpdated={data.skillsUpdatedAt}
      titleString={intl.formatMessage({ id: "skills" })}
      visibility={data.visibleCards.skills}
    >
      <SkillsCardView
        skillCategories={skillCategories}
        skills={formattedSkills}
      />
    </ProfileCards>
  );
};

SkillsCard.propTypes = {
  data: ProfileInfoPropType,
  editableCardBool: PropTypes.bool,
};

SkillsCard.defaultProps = {
  data: null,
  editableCardBool: false,
};

export default SkillsCard;
