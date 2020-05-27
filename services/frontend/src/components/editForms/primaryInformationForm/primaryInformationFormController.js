import React from "react";

import FormManagingComponent from "../common/formManagingComponent";
import PrimaryInformationFormView from "./primaryInformationFormView";

export default class PrimaryInformationFormController extends FormManagingComponent {
  constructor(props) {
    super(props);

    const fixUrl = value =>
      value.toLowerCase().startsWith("http") ? value : "https://" + value;
    this.transformOnChangeValueFuncs["githubUrl"] = fixUrl;
    this.transformOnChangeValueFuncs["linkedinUrl"] = fixUrl;
    this.transformOnChangeValueFuncs["gcconnexUrl"] = fixUrl;
  }

  render() {
    const { buttons } = this.props;
    return (
      <PrimaryInformationFormView
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
