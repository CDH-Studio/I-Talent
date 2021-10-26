import { useMemo } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";

import { ProfileInfoPropType } from "../../../utils/customPropTypes";
import ProfileCardWrapper from "../profileCardWrapper/ProfileCardWrapper";
import EmploymentEquityCardView from "./EmploymentEquityCardView";

/**
 * Generate a list of equity groups based on profile info
 * @param {string[]} employmentEquityGroups list of save equity groups
 * @param {Object} intl intl object
 * @return {Array<{key: string, label: string}>} formatted list of equity groups
 */
const generateEmploymentEquityList = (employmentEquityGroups = [], intl) => {
  const dataMapped = {
    DISABILITY: {
      key: "DISABILITY",
      label: intl.formatMessage({ id: "employment.equity.group.disability" }),
    },
    INDIGENOUS: {
      key: "INDIGENOUS",
      label: intl.formatMessage({ id: "employment.equity.group.indigenous" }),
    },
    MINORITY: {
      key: "MINORITY",
      label: intl.formatMessage({ id: "employment.equity.group.minority" }),
    },
    WOMEN: {
      key: "WOMEN",
      label: intl.formatMessage({ id: "employment.equity.group.woman" }),
    },
  };

  return employmentEquityGroups.map((i) => dataMapped[i]);
};

const EmploymentEquity = ({ data, editableCardBool }) => {
  const intl = useIntl();

  const formattedEmploymentEquityData = useMemo(
    () => generateEmploymentEquityList(data.employmentEquityGroups, intl),
    [data.employmentEquityGroups, intl]
  );

  return (
    <ProfileCardWrapper
      cardName="employmentEquityGroup"
      data={data}
      editableCardBool={editableCardBool}
      editUrl="/profile/edit/primary-info"
      id="card-profile-employment-equity"
      titleString={intl.formatMessage({ id: "employment.equity.groups" })}
      visibility={data.visibleCards.employmentEquityGroup}
    >
      <EmploymentEquityCardView groups={formattedEmploymentEquityData} />
    </ProfileCardWrapper>
  );
};

EmploymentEquity.propTypes = {
  data: ProfileInfoPropType,
  editableCardBool: PropTypes.bool,
};

EmploymentEquity.defaultProps = {
  data: null,
  editableCardBool: false,
};

export default EmploymentEquity;
