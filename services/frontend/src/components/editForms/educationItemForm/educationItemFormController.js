import React from "react";
import { injectIntl } from "react-intl";
import FieldManagingComponent from "../common/formManagingComponent";

import EducationItemFormView from "./educationItemFormView";
import moment from "moment";

class EducationItemFormController extends FieldManagingComponent {
  static getFieldNames() {
    return ["diploma", "endDate", "school", "startDate"];
  }

  constructor(props) {
    super(props);

    const { item } = this.props;

    this.onChangeFuncs["isOngoing"] = () => this.forceUpdate();
    this.tempFields["isOngoing"] = Boolean(
      item.isOngoing || (!item.endDate && item.startDate)
    );

    if (item.startDate) {
      const startMoment = moment(item.startDate);
      this.tempFields["startDateMonth"] = parseInt(startMoment.format("M"));
      this.tempFields["startDateYear"] = parseInt(startMoment.format("YYYY"));
    } else {
      this.tempFields["startDateMonth"] = null;
      this.tempFields["startDateYear"] = null;
    }

    if (item.endDate) {
      const endMoment = moment(item.endDate);
      this.tempFields["endDateMonth"] = parseInt(endMoment.format("M"));
      this.tempFields["endDateYear"] = parseInt(endMoment.format("YYYY"));
    } else {
      this.tempFields["endDateMonth"] = null;
      this.tempFields["endDateYear"] = null;
    }

    let setMoment = startOrEnd => {
      this.setField(
        this.fields,
        startOrEnd + "Date",
        moment(
          this.tempFields[startOrEnd + "DateMonth"] +
            " " +
            this.tempFields[startOrEnd + "DateYear"],
          "M YYYY"
        ).format()
      );
      //this.forceUpdate();
    };

    this.onChangeFuncs["isOngoing"] = () => {
      if (this.tempFields["isOngoing"]) {
        this.setField(this.fields, "endDate", null);
      } else {
        setMoment("end");
      }
    };

    this.onChangeFuncs["endDateMonth"] = setMoment.bind(this, "end");
    this.onChangeFuncs["endDateYear"] = setMoment.bind(this, "end");
    this.onChangeFuncs["startDateMonth"] = setMoment.bind(this, "start");
    this.onChangeFuncs["startDateYear"] = setMoment.bind(this, "start");
  }

  render() {
    const {
      headerName,
      index,
      intl,
      item,
      removeItemByIndex,
      subheaderName
    } = this.props;

    return (
      <EducationItemFormView
        disableEndDate={this.tempFields["isOngoing"]}
        endDateMonth={this.tempFields.endDateMonth}
        endDateYear={this.tempFields.endDateYear}
        headerName={headerName}
        index={index}
        intl={intl}
        isOngoing={this.tempFields.isOngoing}
        item={item}
        onFieldChange={this.onFieldChange}
        onTempFieldChange={this.onTempFieldChange}
        removeItemByIndex={removeItemByIndex}
        startDateMonth={this.tempFields.startDateMonth}
        startDateYear={this.tempFields.startDateYear}
        subheaderName={subheaderName}
        {...this.props}
      />
    );
  }

  setField(fieldObj, name, value) {
    const { index, item, addItem, removeItem } = this.props;
    fieldObj[name] = value;
    if (fieldObj === this.fields) {
      removeItem(index);
      addItem(index, Object.assign(item, fieldObj));
    }
  }
}

export default injectIntl(EducationItemFormController);
