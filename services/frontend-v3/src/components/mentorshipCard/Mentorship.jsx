import React from "react";
import { injectIntl } from "react-intl";

import MentorshipView from "./MentorshipView";

function Mentorship(props) {
  const formatData = list => {
    const locale = props.intl.formatMessage({ id: "language.code" });
    let categorizedList = {};

    if (list) {
      list.forEach(listElement => {
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
  const setUpCategories = list => {
    const locale = props.intl.formatMessage({ id: "language.code" });
    let categorizedList = {};
    let categoriesTemp = {};
    let categories = [];

    let k = 0;

    if (list) {
      list.forEach(listElement => {
        const key = listElement.description.categoryId;
        if (categorizedList[key] == null) {
          categorizedList[key] = [listElement.description[locale]];
          if (categoriesTemp[k] == null) {
            if (locale === "en") {
              categoriesTemp[k] = [
                listElement.description.category["categoryEn"]
              ];
            } else {
              categoriesTemp[k] = [
                listElement.description.category["categoryFr"]
              ];
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

  const setUpMentorshipSkills = () => {
    const { data } = props;
    let mentorshipSkills = [];
    let categorizedSkillsList = formatData(data.mentorshipSkills);

    for (const [index, val] of Object.values(categorizedSkillsList).entries()) {
      mentorshipSkills.push({ index, val });
    }

    return mentorshipSkills;
  };

  return (
    <MentorshipView
      mentoring={setUpMentorshipSkills()}
      mentoringCategories={setUpCategories(props.data.mentorshipSkills)}
    />
  );
}

export default injectIntl(Mentorship);
