import React, { Component } from "react";

import HistoryItemsContainerController from "../common/historyItemsContainer/historyItemsContainerController";
import HistoryItemFormController from "../common/experienceItemForm/experienceItemFormController";
import { injectIntl } from "react-intl";

class CareerOverviewView extends Component {
  render() {
    const { intl } = this.props;
    return (
      <HistoryItemsContainerController
        contentName={intl.formatMessage({ id: "profile.career.content.name" })}
        headerName={intl.formatMessage({ id: "profile.career.header.name" })}
        infoName={"careerSummary"}
        itemType={HistoryItemFormController}
        name={intl.formatMessage({ id: "profile.edit.experience" })}
        subheaderName={intl.formatMessage({
          id: "profile.career.subheader.name"
        })}
        {...this.props}
      />
    );
  }
}

export default injectIntl(CareerOverviewView);
