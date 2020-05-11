import React, { useState } from "react";
import PropTypes from "prop-types";
import ExperienceItemView from "./ExperienceItemView";

const ExperienceItem = ({ item }) => {
  const [expand, setExpand] = useState(false);

  const toggleExpand = () => {
    setExpand(!expand);
  };

  return (
    <ExperienceItemView
      expand={expand}
      toggleExpand={toggleExpand}
      item={item}
    />
  );
};

ExperienceItem.propTypes = {
  item: PropTypes.isRequired,
};

export default ExperienceItem;
