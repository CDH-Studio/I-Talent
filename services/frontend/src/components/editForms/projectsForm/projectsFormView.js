import React, { Component } from "react";
import { injectIntl } from "react-intl";

import TagFormController from "../common/tagForm/tagFormController";

class ProjectsFormView extends Component {
  render() {
    const { intl } = this.props;

    return (
      <TagFormController
        dropdownName="projects"
        name={intl.formatMessage({ id: "profile.edit.projects" })}
        useCustomTags={true}
        {...this.props}
      />
    );
  }
}

export default injectIntl(ProjectsFormView);
