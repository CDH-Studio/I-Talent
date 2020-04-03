import React from "react";
import SquareButtonView from "./SquareButtonView";

function SquareButton(props) {
  return (
    <SquareButtonView
      icon={props.icon}
      firstTitle={props.firstTitle}
      secondTitle={props.secondTitle}
      thirdTitle={props.thirdTitle}
      type={props.type}
    />
  );
}

export default SquareButton;
