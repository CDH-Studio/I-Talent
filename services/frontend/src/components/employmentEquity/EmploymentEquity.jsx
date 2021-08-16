import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";

import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";
import EmploymentEquityView from "./EmploymentEquityView";

const EmploymentEquity = ({ data, editableCardBool }) => {
  const [employmentEquityData, setEmploymentEquityData] = useState([]);
  const intl = useIntl();

  useEffect(() => {
    const dataMapped = {
      DISABILITY: {
        key: "DISABILITY",
        text: intl.formatMessage({ id: "employment.equity.group.disability" }),
      },
      INDIGENOUS: {
        key: "INDIGENOUS",
        text: intl.formatMessage({ id: "employment.equity.group.indigenous" }),
      },
      MINORITY: {
        key: "MINORITY",
        text: intl.formatMessage({ id: "employment.equity.group.minority" }),
      },
      WOMEN: {
        key: "WOMEN",
        text: intl.formatMessage({ id: "employment.equity.group.woman" }),
      },
    };

    setEmploymentEquityData(
      data.employmentEquityGroups.map((i) => dataMapped[i])
    );
  }, [intl, data]);

  return (
    <ProfileCards
      cardName="employmentEquityGroup"
      data={data}
      editableCardBool={editableCardBool}
      editUrl="/profile/edit/primary-info"
      id="card-profile-employment-equity"
      titleString={intl.formatMessage({ id: "employment.equity.groups" })}
      visibility={data.visibleCards.employmentEquityGroup}
    >
      <EmploymentEquityView groups={employmentEquityData} />
    </ProfileCards>
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
