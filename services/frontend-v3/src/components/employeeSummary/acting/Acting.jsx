import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import ActingView from "./ActingView";

const Acting = ({ data }) => {
  const formatData = () => {
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

  return <ActingView values={formatData()} />;
};

Acting.propTypes = {
  data: PropTypes.shape({
    acting: PropTypes.shape({
      description: PropTypes.string,
    }),
    actingPeriodEndDate: PropTypes.string,
    actingPeriodStartDate: PropTypes.string,
  }).isRequired,
};

export default Acting;
