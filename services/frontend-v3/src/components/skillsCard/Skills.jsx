import React from "react";

import SkillsView from "./SkillsView";

function Skills(props) {
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
            k++;
          }
        } else {
          categorizedList[key].push(listElement.description[locale]);
        }
      });
    }

    for (const [index, val] of Object.values(categoriesTemp).entries()) {
      categories.push({ index, val });
    }

    return categories;
  };

  const setUpSkills = (dataSource) => {
    const skills = [];

    const categorizedSkillsList = formatData(dataSource);

    for (const [index, val] of Object.values(categorizedSkillsList).entries()) {
      skills.push({ index, val });
    }
    return skills;
  };

  return (
    <SkillsView
      skills={setUpSkills(props.data.skills)}
      categoriesSkills={setUpCategories(props.data.skills)}
    />
  );
}

export default Skills;
