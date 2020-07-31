import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import EmployeeSummaryView from "./EmployeeSummaryView";
import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";

const EmployeeSummary = ({ data, type }) => {
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [editUrl, setEditUrl] = useState("");

  useEffect(() => {
    if (activeTabKey === "3") {
      setEditUrl("language-proficiency");
    } else {
      setEditUrl("employment");
    }
  }, [activeTabKey]);

  return (
    <ProfileCards
      titleId="profile.employee.summary"
      content={
        <EmployeeSummaryView data={data} setActiveTabKey={setActiveTabKey} />
      }
      cardName="info"
      id="card-profile-employee-summary"
      editUrl={`/profile/edit/${editUrl}`}
      data={data}
      type={type}
      visible={data.visibleCards.info}
    />
  );
};

EmployeeSummary.propTypes = {
  data: ProfileInfoPropType,
  type: PropTypes.bool,
};

EmployeeSummary.defaultProps = {
  data: null,
  type: null,
};

export default EmployeeSummary;
