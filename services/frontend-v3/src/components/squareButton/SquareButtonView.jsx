import React from "react";
import { Button, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Text } = Typography;

function SquareButtonView(props) {
  // set icon color based on name
  var iconColor = {
    backgroundColor: props.color,
    color: "#fff"
  };

  const componentStyle = {
    verticalAlign: "middle"
  };

  // merge component style with styles passed through from parent
  var mergedStyles = {
    ...props.style,
    ...componentStyle,
    ...iconColor
  };

  const truncateString = (text, length) => {
    if (text && text.length > length) {
      return text.substring(0, length) + ".";
    } else {
      return text;
    }
  };

  return (
    <Button style={{ width: "180px", height: "180px", margin: "10px" }}>
      <div
        style={{
          opacity: 0.7,
          fontSize: "65px",
          display: "block",
          marginTop: "-15px"
        }}
      >
        {props.icon}
      </div>
      <div
        style={{
          opacity: 0.7,
          fontSize: "17px",
          display: "block",
          height: "auto",
          marginTop: "-13px"
        }}
      >
        <strong>{truncateString(props.firstTitle, 17)}</strong>
      </div>
      <div
        style={{
          opacity: 0.7,
          fontSize: "15px",
          display: "block",
          marginTop: "-4px"
        }}
      >
        {props.secondTitle ? (
          truncateString(props.secondTitle, 17)
        ) : (
          <div style={{ opacity: 0 }}>empty</div>
        )}
      </div>
      <div
        style={{
          opacity: 0.7,
          fontSize: "15px",
          display: "block",
          fontStyle: "italic",
          marginTop: "-4px"
        }}
      >
        {props.thirdTitle ? (
          truncateString(props.thirdTitle, 19)
        ) : (
          <div style={{ opacity: 0 }}>empty</div>
        )}
      </div>
    </Button>
  );
}

export default SquareButtonView;
