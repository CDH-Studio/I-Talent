import { useIntl } from "react-intl";
import PropTypes from "prop-types";

import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";
import SkillsView from "./SkillsView";

const Skills = ({ data, editableCardBool }) => {
  const intl = useIntl();

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
      cardName="skills"
      data={data}
      editableCardBool={editableCardBool}
      editUrl="/profile/edit/talent?tab=skills"
      id="card-profile-skills"
      lastUpdated={data.skillsUpdatedAt}
      titleString={intl.formatMessage({ id: "skills" })}
      visibility={data.visibleCards.skills}
    >
      <SkillsView
        categoriesSkills={setUpCategories(data.skills)}
        skills={setUpSkills(data.skills)}
      />
    </ProfileCards>
  );
};

Skills.propTypes = {
  data: ProfileInfoPropType,
  editableCardBool: PropTypes.bool,
};

Skills.defaultProps = {
  data: null,
  editableCardBool: false,
};

export default Skills;
