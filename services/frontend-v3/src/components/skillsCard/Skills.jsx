import React, { Component } from "react";
import { injectIntl } from "react-intl";

import SkillsView from "./SkillsView";

class Skills extends Component {
  formatData(list) {
    const locale = this.props.intl.formatMessage({ id: "language.code" });
    let categorizedList = {};

    list.forEach(listElement => {
      const key = listElement.description.categoryId;
      if (categorizedList[key] == null) {
        categorizedList[key] = [listElement.description[locale]];
      } else {
        categorizedList[key].push(listElement.description[locale]);
      }
    });
    return categorizedList;
  }

  setUpCategories(list) {
    console.log(list);

    const locale = this.props.intl.formatMessage({ id: "language.code" });
    let categorizedList = {};
    let categoriesTemp = {};
    let categories = [];

    let k = 0;
    list.forEach(listElement => {
      const key = listElement.description.categoryId;
      if (categorizedList[key] == null) {
        categorizedList[key] = [listElement.description[locale]];
        if (categoriesTemp[k] == null) {
          if (locale === "en") {
            categoriesTemp[k] = [listElement.description.category["en"]];
            console.log(listElement.description.category["cen"]);
          } else {
            categoriesTemp[k] = [listElement.description.category["fr"]];
          }
          k++;
        }
      } else {
        categorizedList[key].push(listElement.description[locale]);
      }
    });
    console.log(categoriesTemp);

    for (const [index, val] of Object.values(categoriesTemp).entries()) {
      categories.push({ index, val });
    }

    return categories;
  }

  setUpSkills() {
    const { data } = this.props;
    let skills = [];
    let categorizedSkillsList = this.formatData(data.skills);

    for (const [index, val] of Object.values(categorizedSkillsList).entries()) {
      skills.push({ index, val });
    }
    return skills;
  }

  setUpMentorshipSkills() {
    const { data } = this.props;
    let mentorshipSkills = [];
    let categorizedSkillsList = this.formatData(data.mentorshipSkills);

    for (const [index, val] of Object.values(categorizedSkillsList).entries()) {
      mentorshipSkills.push({ index, val });
    }

    return mentorshipSkills;
  }

  render() {
    const { data } = this.props;

    return (
      <SkillsView
        skills={this.setUpSkills()}
        mentoring={this.setUpMentorshipSkills()}
        categoriesSkills={this.setUpCategories(data.skills)}
        categoriesMentor={this.setUpCategories(data.mentorshipSkills)}
      />
    );
  }
}

export default injectIntl(Skills);
