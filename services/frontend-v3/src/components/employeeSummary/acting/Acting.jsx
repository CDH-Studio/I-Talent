import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import ActingView from "./ActingView";
import moment from "moment";

function Acting(props) {
  const formatData = data => {
    const actingId = data.acting.id;
    const actingPeriodStartDate = data.actingPeriodStartDate;
    const actingPeriodEndDate = data.actingPeriodEndDate;

    let actingInfo = [];

    if (actingId != null) {
      const acting = {
        title: <FormattedMessage id="profile.acting" />,
        description: data.acting.description
      };
      actingInfo.push(acting);

      if (actingPeriodStartDate) {
        let desc =
          moment(actingPeriodStartDate).format("ll") +
          (actingPeriodStartDate
            ? " - " + moment(actingPeriodEndDate).format("ll")
            : "");

        const actingDate = {
          title: <FormattedMessage id="profile.acting.date" />,
          description: desc
        };

        actingInfo.push(actingDate);
      }
    }

    return [...actingInfo];
  };

  return <ActingView values={formatData(props.data)} />;
}

export default injectIntl(Acting);
