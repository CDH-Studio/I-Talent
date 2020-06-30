import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage, injectIntl } from "react-intl";
import moment from "moment";
import ActingView from "./ActingView";

const Acting = ({ data, intl }) => {
  const formatData = () => {
    const actingInfo = [];

    if (data.acting) {
      const acting = {
        title: <FormattedMessage id="profile.acting" />,
        description: data.acting.description,
      };
      actingInfo.push(acting);

      const formattedEndDate = data.actingPeriodEndDate
        ? moment(data.actingPeriodEndDate).format("ll")
        : intl.formatMessage({ id: "profile.is.ongoing" });

      if (data.actingPeriodStartDate) {
        const desc =
          moment(data.actingPeriodStartDate).format("ll") +
          (data.actingPeriodStartDate ? ` - ${formattedEndDate}` : "");

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
  intl: PropTypes.shape({ formatMessage: PropTypes.func }),
};

Acting.defaultProps = {
  intl: undefined,
};

export default injectIntl(Acting);
