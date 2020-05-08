import React from "react";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import ActingView from "./ActingView";

function Acting(props) {
  const formatData = (data) => {
    const actingInfo = [];

    if (data.acting) {
      const acting = {
        title: <FormattedMessage id="profile.acting" />,
        description: data.acting.description,
      };
      actingInfo.push(acting);

      if (data.actingPeriodStartDate) {
        const desc =
          moment(data.actingPeriodStartDate).format("ll") +
          (data.actingPeriodStartDate
            ? ` - ${moment(data.actingPeriodEndDate).format("ll")}`
            : "");

        const actingDate = {
          title: <FormattedMessage id="profile.acting.date" />,
          description: desc,
        };

        actingInfo.push(actingDate);
      }
    }

    return [...actingInfo];
  };

  return <ActingView values={formatData(props.data)} />;
}

export default Acting;
