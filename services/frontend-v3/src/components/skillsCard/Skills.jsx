import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";

import SkillsView from "./SkillsView";

class Skills extends Component {
  formatData() {
    const { data } = this.props;
    const locale = this.props.intl.formatMessage({ id: "language.code" });
    let categorizedSkillsList = {};

    data.skills.forEach(skill => {
      const key = skill.description.categoryId;
      if (categorizedSkillsList[key] == null) {
        categorizedSkillsList[key] = [skill.description[locale]];
      } else {
        categorizedSkillsList[key].push(skill.description[locale]);
      }
    });

    return categorizedSkillsList;
  }

  setUpCategories() {
    const { data } = this.props;
    const locale = this.props.intl.formatMessage({ id: "language.code" });
    let categorizedSkillsList = {};
    let categoriesTemp = {};
    let categories = [];

    let k = 0;
    data.skills.forEach(skill => {
      const key = skill.description.categoryId;
      if (categorizedSkillsList[key] == null) {
        categorizedSkillsList[key] = [skill.description[locale]];
        if (categoriesTemp[k] == null) {
          if (locale == "en") {
            categoriesTemp[k] = [skill.description.category["categoryEn"]];
          } else {
            categoriesTemp[k] = [skill.description.category["categoryFr"]];
          }
          k++;
        }
      } else {
        categorizedSkillsList[key].push(skill.description[locale]);
      }
    });

    for (const [index, val] of Object.values(categoriesTemp).entries()) {
      categories.push({ index, val });
    }

    return categories;
  }

  setUpSkills() {
    let skills = [];
    let categorizedSkillsList = this.formatData();

    for (const [index, val] of Object.values(categorizedSkillsList).entries()) {
      skills.push({ index, val });
    }
    return skills;
  }

  render() {
    const { data } = this.props;
    let categoryTest = this.setUpCategories();
    console.log(data);

    return (
      <SkillsView
        skills={this.setUpSkills()}
        categories={this.setUpCategories()}
      />
    );
  }
}

export default injectIntl(Skills);
