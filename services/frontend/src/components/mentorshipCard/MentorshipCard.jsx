import { useMemo } from "react";
import { useIntl } from "react-intl";
import { has } from "lodash";
import PropTypes from "prop-types";

import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";
import MentorshipCardView from "./MentorshipCardView";

const Mentorship = ({ data, editableCardBool }) => {
  const intl = useIntl();

  /**
   * Format mentorship skills list into categories
   * @param {object[]} skillsList - Object describing the categorized skills list
   * @param {string} skillsList[].category - Skill category name
   * @param {string} skillsList[].categoryId - id of the skill's category
   * @param {string} skillsList[].id - id of the skill
   * @param {string} skillsList[].name - name of the skill
   * @returns {object} - Object describing the categorized skills list
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
   * @param {object} formattedSkills - Object describing the categorized skills list
   * @returns {Array<string>} - Array of skill categories
   */
  const getSkillCategories = (formattedSkills) => Object.keys(formattedSkills);

  const formattedSkills = useMemo(() => categorizeSkills(data.skills), [data]);
  const skillCategories = getSkillCategories(formattedSkills);

  return (
    <ProfileCards
      cardName="mentorshipSkills"
      data={data}
      editableCardBool={editableCardBool}
      editUrl="/profile/edit/talent?tab=skills"
      id="card-profile-mentorship-skills"
      lastUpdated={data.mentorshipSkillsUpdatedAt}
      titleString={intl.formatMessage({ id: "mentorship.skills" })}
      visibility={data.visibleCards.mentorshipSkills}
    >
      <MentorshipCardView
        mentorshipSkill={formattedSkills}
        mentorshipSkillCategories={skillCategories}
      />
    </ProfileCards>
  );
};

Mentorship.propTypes = {
  data: ProfileInfoPropType,
  editableCardBool: PropTypes.bool,
};

Mentorship.defaultProps = {
  data: null,
  editableCardBool: false,
};

export default Mentorship;
