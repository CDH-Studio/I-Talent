import React, { Component } from "react";
import TagFormController from "../common/tagForm/tagFormController";
import { injectIntl } from "react-intl";

class DevelopmentalGoalsFormView extends Component {
  render() {
    const { intl } = this.props;

    return (
      <TagFormController
        dropdownName="developmentalGoals"
        name={intl.formatMessage({ id: "profile.edit.developmental.goals" })}
        {...this.props}
      />
    );
  }
}

export default injectIntl(DevelopmentalGoalsFormView);
