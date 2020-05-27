import React from "react";
import moment from "moment";

import FormManagingComponent from "../common/formManagingComponent";
import LanguageProficiencyFormView from "./languageProficiencyFormView";

export default class LanguageProficiencyFormController extends FormManagingComponent {
  constructor(props) {
    super(props);

    /*this.tempFields["gradedOnSecondLanguage"] = Boolean(
      profileInfo["secondaryOralProficiency"] ||
        profileInfo["secondaryReadingProficiency"] ||
        profileInfo["secondaryWritingingProficiency"]
    );*/

    this.onChangeFuncs["gradedOnSecondLanguage"] = () => this.forceUpdate();
    this.onChangeFuncs["secondaryOralDate"] = () => this.forceUpdate();
    this.onChangeFuncs["secondaryReadingDate"] = () => this.forceUpdate();
    this.onChangeFuncs["secondaryWritingDate"] = () => this.forceUpdate();

    this.transformOnChangeValueFuncs["secondaryOralDate"] = value =>
      moment(value, "MMM DD YYYY");
    this.transformOnChangeValueFuncs["secondaryReadingDate"] = value =>
      moment(value, "MMM DD YYYY");
    this.transformOnChangeValueFuncs["secondaryWritingDate"] = value =>
      moment(value, "MMM DD YYYY");
  }

  render() {
    const { buttons, profileInfo } = this.props;
    return (
      <LanguageProficiencyFormView
        buttons={buttons}
        fields={this.fields}
        getCurrentValue={this.getCurrentValue}
        onFieldChange={this.onFieldChange}
        onSubmit={this.onSubmit}
        onTempFieldChange={this.onTempFieldChange}
        secondaryGradingDisabled={
          "gradedOnSecondLanguage" in this.fields
            ? !this.fields["gradedOnSecondLanguage"]
            : !profileInfo["gradedOnSecondLanguage"]
        }
        tempFields={this.tempFields}
        {...this.props}
      />
    );
  }
}
