import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import EmployeeSummaryView from "./EmployeeSummaryView";
import { ProfileInfoPropType } from "../../customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";

const EmployeeSummary = ({ data, title, cardName, id, type, visible }) => {
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
      title={title}
      content={
        <EmployeeSummaryView data={data} setActiveTabKey={setActiveTabKey} />
      }
      cardName={cardName}
      id={id}
      editUrl={`/secured/profile/edit/${editUrl}`}
      data={data}
      type={type}
      visible={visible}
    />
  );
};

EmployeeSummary.propTypes = {
  data: ProfileInfoPropType,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  cardName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.bool,
  visible: PropTypes.bool,
};

EmployeeSummary.defaultProps = {
  data: null,
  type: null,
  visible: null,
};

export default EmployeeSummary;
