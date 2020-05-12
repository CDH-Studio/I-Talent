import React from "react";
import PropTypes from "prop-types";
import SkillsView from "./SkillsView";

const Skills = ({ data }) => {
  const formatData = (list) => {
    const locale = localStorage.getItem("lang") || "en";

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
    const locale = localStorage.getItem("lang") || "en";
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

  const setUpSkills = (dataSource) => {
    const skills = [];

    const categorizedSkillsList = formatData(dataSource);

    // eslint-disable-next-line no-restricted-syntax
    for (const [index, val] of Object.values(categorizedSkillsList).entries()) {
      skills.push({ index, val });
    }
    return skills;
  };

  return (
    <SkillsView
      skills={setUpSkills(data.skills)}
      categoriesSkills={setUpCategories(data.skills)}
    />
  );
};

Skills.propTypes = {
  data: PropTypes.isRequired,
};

export default Skills;
