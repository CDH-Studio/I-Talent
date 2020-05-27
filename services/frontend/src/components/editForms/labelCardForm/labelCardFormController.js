import React from "react";

import FormManagingComponent from "../common/formManagingComponent";
import LabelCardFormView from "./labelCardFormView";
import moment from "moment";

export default class LabelCardFormController extends FormManagingComponent {
  constructor(props) {
    super(props);
    const { profileInfo } = this.props;

    const isActing =
      Boolean(profileInfo["actingPeriodStartDate"]) &&
      Boolean(profileInfo["acting"]);

    this.tempFields["actingHasEndDate"] =
      isActing && Boolean(profileInfo["actingPeriodEndDate"]);

    this.onChangeFuncs["actingPeriodEndDate"] = () => this.forceUpdate();
    this.onChangeFuncs["actingHasEndDate"] = () => this.forceUpdate();
    this.onChangeFuncs["actingPeriodStartDate"] = () => this.forceUpdate();

    this.transformOnChangeValueFuncs["actingPeriodStartDate"] = value =>
      moment(value, "MMM DD YYYY");

    this.onChangeFuncs["temporaryRole"] = () => this.forceUpdate();
  }

  getActingIsDisabled() {
    const { editProfileOptions, profileInfo } = this.props;
    let selectedObj = editProfileOptions.temporaryRole.find(
      obj =>
        obj.value ===
        (this.fields.temporaryRole ||
          (profileInfo.temporaryRole && profileInfo.temporaryRole.id))
    );

    return !Boolean(
      selectedObj &&
        (selectedObj.text === "Par intérim" || selectedObj.text === "Acting")
    );
  }

  render() {
    const { buttons } = this.props;
    const actingDisabled = this.getActingIsDisabled();
    return (
      <LabelCardFormView
        actingDisabled={actingDisabled}
        actingEndDisabled={
          !Boolean(this.getCurrentValue("actingHasEndDate")) || actingDisabled
        }
        actingPeriodEndDate={this.getCurrentValue("actingPeriodEndDate")}
        actingPeriodStartDate={this.getCurrentValue("actingPeriodStartDate")}
        buttons={buttons}
        fields={this.fields}
        getCurrentValue={this.getCurrentValue}
        onFieldChange={this.onFieldChange}
        onSubmit={() => {
          if (actingDisabled) {
            this.fields["acting"] = null;
            this.fields["actingPeriodStartDate"] = null;
            this.fields["actingPeriodEndDate"] = null;
          }

          this.onSubmit();
        }}
        onTempFieldChange={this.onTempFieldChange}
        tempFields={this.tempFields}
        {...this.props}
      />
    );
  }
}
