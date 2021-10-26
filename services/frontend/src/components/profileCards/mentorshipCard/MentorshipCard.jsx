import { useMemo } from "react";
import { useIntl } from "react-intl";
import { has } from "lodash";
import PropTypes from "prop-types";

import { ProfileInfoPropType } from "../../../utils/customPropTypes";
import ProfileCardWrapper from "../profileCardWrapper/ProfileCardWrapper";
import MentorshipCardView from "./MentorshipCardView";

/**
 * Format mentorship skills list into categories
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

const Mentorship = ({ data, editableCardBool }) => {
  const intl = useIntl();

  const formattedSkills = useMemo(
    () => categorizeSkills(data.mentorshipSkills),
    [data]
  );
  const skillCategories = getSkillCategories(formattedSkills);

  return (
    <ProfileCardWrapper
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
    </ProfileCardWrapper>
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
