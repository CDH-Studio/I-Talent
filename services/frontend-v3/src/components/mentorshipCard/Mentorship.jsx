import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import MentorshipView from "./MentorshipView";

const Mentorship = ({ data }) => {
  const { locale } = useSelector((state) => state.settings);

  const formatData = (list) => {
    const categorizedList = {};

    if (list) {
      list.forEach((listElement) => {
        const key = listElement.description.categoryId;
        if (categorizedList[key] == null) {
          categorizedList[key] = [listElement.description[locale]];
        } else {
          categorizedList[key].push(listElement.description[locale]);
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
        const key = listElement.description.categoryId;
        if (categorizedList[key] == null) {
          categorizedList[key] = [listElement.description[locale]];
          if (categoriesTemp[k] == null) {
            if (locale === "en") {
              categoriesTemp[k] = [listElement.description.category.en];
            } else {
              categoriesTemp[k] = [listElement.description.category.fr];
            }
            k += 1;
          }
        } else {
          categorizedList[key].push(listElement.description[locale]);
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
    <MentorshipView
      mentoring={setUpMentorshipSkills()}
      mentoringCategories={setUpCategories(data.mentorshipSkills)}
    />
  );
};

Mentorship.propTypes = {
  data: PropTypes.shape({
    mentorshipSkills: PropTypes.any,
  }).isRequired,
};

export default Mentorship;
