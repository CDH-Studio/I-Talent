import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import dayjs from "dayjs";
import ActingView from "./ActingView";

const Acting = ({ data }) => {
  const formatData = () => {
    const actingInfo = [];

    if (data.actingLevel) {
      const acting = {
        title: <FormattedMessage id="profile.acting" />,
        description: data.actingLevel.name,
      };

      actingInfo.push(acting);

      if (data.actingStartDate) {
        const desc =
          dayjs(data.actingStartDate).format("ll") +
          (data.actingStartDate
            ? ` - ${dayjs(data.actingEndDate).format("ll")}`
            : "");

        const actingDate = {
          title: <FormattedMessage id="profile.acting.date" />,
          description: desc,
        };

        actingInfo.push(actingDate);
      }
    }
    return actingInfo;
  };
  return <ActingView values={formatData()} />;
};

Acting.propTypes = {
  data: PropTypes.shape({
    actingLevel: PropTypes.shape({
      name: PropTypes.string,
    }),
    actingEndDate: PropTypes.string,
    actingStartDate: PropTypes.string,
  }).isRequired,
};

export default Acting;
