import React, { Component } from "react";
import TagFormController from "../common/tagForm/tagFormController";
import { injectIntl } from "react-intl";

class CompetenciesFormView extends Component {
  render() {
    const { intl } = this.props;

    return (
      <TagFormController
        dropdownName="competencies"
        name={intl.formatMessage({ id: "profile.edit.competencies" })}
        {...this.props}
      />
    );
  }
}

export default injectIntl(CompetenciesFormView);
