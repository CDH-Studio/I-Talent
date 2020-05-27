import React from "react";

import FormManagingComponent from "../common/formManagingComponent";
import TalentManagementFormView from "./talentManagementFormView";

export default class ManagerFormController extends FormManagingComponent {
  render() {
    const { buttons } = this.props;
    return (
      <TalentManagementFormView
        buttons={buttons}
        fields={this.fields}
        getCurrentValue={this.getCurrentValue}
        onFieldChange={this.onFieldChange}
        onSubmit={() => {
          this.onSubmit();
        }}
        onTempFieldChange={this.onTempFieldChange}
        tempFields={this.tempFields}
        {...this.props}
      />
    );
  }
}
