import React from "react";

import FormManagingComponent from "../common/formManagingComponent";
import CareerInterestsFormView from "./careerInterestsFormView";

export default class CareerInterestsFormController extends FormManagingComponent {
  render() {
    const { buttons } = this.props;
    return (
      <CareerInterestsFormView
        buttons={buttons}
        fields={this.fields}
        getCurrentValue={this.getCurrentValue}
        onFieldChange={this.onFieldChange}
        onSubmit={this.onSubmit}
        onTempFieldChange={this.onTempFieldChange}
        tempFields={this.tempFields}
        {...this.props}
      />
    );
  }
}
