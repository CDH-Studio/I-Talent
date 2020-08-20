import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import EmploymentEquityView from "./EmploymentEquityView";
import ProfileCards from "../profileCards/ProfileCards";
import { ProfileInfoPropType } from "../../utils/customPropTypes";

const EmploymentEquity = ({ data, type }) => {
  const [employmentEquityData, setEmploymentEquityData] = useState([]);
  const intl = useIntl();

  useEffect(() => {
    const dataMapped = {
      WOMEN: {
        key: "WOMEN",
        text: intl.formatMessage({ id: "employment.equity.group.woman" }),
      },
      INDIGENOUS: {
        key: "INDIGENOUS",
        text: intl.formatMessage({ id: "employment.equity.group.indigenous" }),
      },
      DISABILITY: {
        key: "DISABILITY",
        text: intl.formatMessage({ id: "employment.equity.group.disability" }),
      },
      MINORITY: {
        key: "MINORITY",
        text: intl.formatMessage({ id: "employment.equity.group.minority" }),
      },
    };

    setEmploymentEquityData(
      data.employmentEquityGroups.map((i) => dataMapped[i])
    );
  }, [intl, data]);

  return (
    <ProfileCards
      titleId="profile.employment.equity.groups"
      content={<EmploymentEquityView groups={employmentEquityData} />}
      cardName="employmentEquityGroup"
      id="card-profile-employment-equity"
      editUrl="/profile/edit/primary-info"
      data={data}
      type={type}
      visible={data.visibleCards.employmentEquityGroup}
    />
  );
};

EmploymentEquity.propTypes = {
  data: ProfileInfoPropType,
  type: PropTypes.bool,
};

EmploymentEquity.defaultProps = {
  data: null,
  type: null,
};

export default EmploymentEquity;
