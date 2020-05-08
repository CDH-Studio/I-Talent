import React, { useState, useEffect } from "react";
import ExperienceItemView from "./ExperienceItemView";

function ExperienceItem(props) {
  const [expand, setExpand] = useState(false);

  const toggleExpand = () => {
    setExpand(!expand);
  };

  return (
    <ExperienceItemView
      expand={expand}
      toggleExpand={toggleExpand}
      {...props}
    />
  );
}

export default ExperienceItem;
