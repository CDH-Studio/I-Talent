import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import EmployeeSummaryView from "./EmployeeSummaryView";
import { ProfileInfoPropType } from "../../customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";

const EmployeeSummary = ({ data, title, cardName, id }) => {
  const [activeTabKey, setActiveTabKey] = useState('1');
  const [editUrl, setEditUrl] = useState("");

  useEffect(() => {
    if (activeTabKey === '3') {
      setEditUrl("language-proficiency")
    } else {
      setEditUrl("employment")
    }
  }, [activeTabKey])

  return (
    <ProfileCards
      title={title}
      content={
        <EmployeeSummaryView data={data} setActiveTabKey={setActiveTabKey} />
      }
      cardName={cardName}
      id={id}
      editUrl={`/secured/profile/edit/${editUrl}`}
      data={data}
    />
  );
};

EmployeeSummary.propTypes = {
  data: ProfileInfoPropType,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  cardName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

EmployeeSummary.defaultProps = {
  data: null,
};

export default EmployeeSummary;
