import React, { Component } from "react";
import { injectIntl } from "react-intl";

import TagFormController from "../common/tagForm/tagFormController";

class SkillsFormView extends Component {
  render() {
    const { editProfileOptions, intl } = this.props;
    const { maxSkillItems } = editProfileOptions;

    return (
      <TagFormController
        dropdownName="skills"
        maxItems={maxSkillItems}
        name={intl.formatMessage({ id: "profile.edit.skills" })}
        {...this.props}
      />
    );
  }
}

export default injectIntl(SkillsFormView);
