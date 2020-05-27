import React from "react";

import FormManagingComponent from "../common/formManagingComponent";
import ManagerFormView from "./managerFormView";

export default class ManagerFormController extends FormManagingComponent {
  render() {
    const { buttons } = this.props;
    return (
      <ManagerFormView
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
