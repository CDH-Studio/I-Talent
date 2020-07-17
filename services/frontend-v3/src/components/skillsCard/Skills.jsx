import React from "react";
import PropTypes from "prop-types";
import SkillsView from "./SkillsView";
import { ProfileInfoPropType } from "../../customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";

const Skills = ({ data, type }) => {
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
    <ProfileCards
      titleId="profile.skills"
      content={
        <SkillsView
          skills={setUpSkills(data.skills)}
          categoriesSkills={setUpCategories(data.skills)}
        />
      }
      cardName="skills"
      id="card-profile-skills"
      editUrl="/secured/profile/edit/talent"
      data={data}
      type={type}
      visible={data.visibleCards.skills}
    />
  );
};

Skills.propTypes = {
  data: ProfileInfoPropType,
  type: PropTypes.bool,
};

Skills.defaultProps = {
  data: null,
  type: null,
};

export default Skills;
