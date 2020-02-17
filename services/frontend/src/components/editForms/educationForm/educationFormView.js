import React, { Component } from "react";

import HistoryItemsContainerController from "../common/historyItemsContainer/historyItemsContainerController";
import EducationItemForm from "../educationItemForm/educationItemFormController";
import { injectIntl } from "react-intl";

import "../common/form.css";

class EducationFormView extends Component {
  render() {
    const { intl } = this.props;
    return (
      <HistoryItemsContainerController
        contentName={intl.formatMessage({
          id: "profile.education.content.name"
        })}
        headerName={intl.formatMessage({ id: "profile.education.header.name" })}
        infoName={"education"}
        itemType={EducationItemForm}
        name={intl.formatMessage({ id: "profile.edit.education" })}
        subheaderName={intl.formatMessage({
          id: "profile.education.subheader.name"
        })}
        {...this.props}
      />
    );
  }
}
export default injectIntl(EducationFormView);
