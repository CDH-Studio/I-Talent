import React from "react";
import PropTypes from "prop-types";
import { ProfileInfoPropType } from "../../utils/customPropTypes";
import MentorshipView from "./MentorshipView";
import ProfileCards from "../profileCards/ProfileCards";

const Mentorship = ({ data, type }) => {
  const formatData = (list) => {
    const categorizedList = {};

    if (list) {
      list.forEach((listElement) => {
        const key = listElement.categoryId;

        if (categorizedList[key] == null) {
          categorizedList[key] = [listElement.name];
        } else {
          categorizedList[key].push(listElement.name);
        }
      });
    }

    return categorizedList;
  };
  const setUpCategories = (list) => {
    const categorizedList = {};
    const categoriesTemp = {};
    const categories = [];

    let k = 0;

    if (list) {
      list.forEach((listElement) => {
        const key = listElement.categoryId;
        if (categorizedList[key] == null) {
          categorizedList[key] = [listElement.name];
          if (categoriesTemp[k] == null) {
            categoriesTemp[k] = [listElement.category];
            k += 1;
          }
        } else {
          categorizedList[key].push(listElement.name);
        }
      });
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const [index, val] of Object.values(categoriesTemp).entries()) {
      categories.push({ index, val });
    }

    return categories;
  };

  const setUpMentorshipSkills = () => {
    const mentorshipSkills = [];
    const categorizedSkillsList = formatData(data.mentorshipSkills);

    // eslint-disable-next-line no-restricted-syntax
    for (const [index, val] of Object.values(categorizedSkillsList).entries()) {
      mentorshipSkills.push({ index, val });
    }

    return mentorshipSkills;
  };
  return (
    <ProfileCards
      titleId="profile.mentorship.skills"
      content={
        <MentorshipView
          mentoring={setUpMentorshipSkills()}
          mentoringCategories={setUpCategories(data.mentorshipSkills)}
        />
      }
      cardName="mentorshipSkills"
      id="card-profile-mentorship-skills"
      editUrl="/profile/edit/talent?tab=mentorship"
      data={data}
      type={type}
      visible={data.visibleCards.mentorshipSkills}
      lastUpdated={data.mentorshipSkillsUpdatedAt}
    />
  );
};

Mentorship.propTypes = {
  data: ProfileInfoPropType,
  type: PropTypes.bool,
};

Mentorship.defaultProps = {
  data: null,
  type: null,
};

export default Mentorship;
