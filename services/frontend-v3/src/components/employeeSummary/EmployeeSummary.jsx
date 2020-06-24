import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import EmployeeSummaryView from "./EmployeeSummaryView";
import { ProfileInfoPropType } from "../../customPropTypes";

const EmployeeSummary = ({ data }) => {
  const { locale } = useSelector((state) => state.settings);

  const formatData = () => {
    const classification = {
      title: <FormattedMessage id="profile.classification" />,
      description:
        data.classification &&
        (data.classification.description || (
          <FormattedMessage id="profile.not.specified" />
        )),
    };

    const security = {
      title: <FormattedMessage id="profile.security" />,
      description:
        data.security &&
        (data.security.description[locale] || (
          <FormattedMessage id="profile.not.specified" />
        )),
    };

    let substantiveDescription = <FormattedMessage id="profile.term" />;

    if (
      data.temporaryRole.description &&
      data.temporaryRole.description[locale]
    ) {
      substantiveDescription = data.temporaryRole.description[locale];
    } else if (data.indeterminate) {
      substantiveDescription = <FormattedMessage id="profile.indeterminate" />;
    }

    const substative = {
      title: <FormattedMessage id="profile.substantive" />,
      description: substantiveDescription,
    };

    const returnData = [substative, classification, security];

    if (data.acting && data.acting.description) {
      returnData.push({
        title: <FormattedMessage id="profile.acting" />,
        description: data.acting.description,
      });
    }

    if (data.actingPeriodStartDate) {
      returnData.push({
        title: <FormattedMessage id="profile.acting.date" />,
        description:
          moment(data.actingPeriodStartDate).format("ll") +
          (data.actingPeriodStartDate
            ? ` - ${moment(data.actingPeriodEndDate).format("ll")}`
            : ""),
      });
    }

    return returnData;
  };

  return <EmployeeSummaryView values={formatData()} />;
};

EmployeeSummary.propTypes = {
  data: ProfileInfoPropType,
};

EmployeeSummary.defaultProps = {
  data: null,
};

export default EmployeeSummary;
