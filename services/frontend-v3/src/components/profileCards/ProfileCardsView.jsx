import React, { useState, useEffect } from "react";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  EditOutlined
} from "@ant-design/icons";
import "@ant-design/compatible/assets/index.css";
import { Card, Switch, Button, Row, Col, Tooltip } from "antd";
import { FormattedMessage } from "react-intl";

import axios from "axios";
import config from "../../config";
const { backendAddress } = config;

function ProfileCardsView(props) {
  const [disabled, setDisabled] = useState(true);

  /*
   * Handle Visibility Toggle
   *
   * Handle card visibility toggle by updating state and saving state to backend
   */
  const handleVisibilityToggle = async () => {
    // Update visibleCards state in profile
    try {
      // Get current card visibility status from db
      let url =
        backendAddress + "api/profile/" + localStorage.getItem("userId");
      let result = await axios.get(url);
      let visibleCards = result.data.visibleCards;

      // change the stored value
      const cardNameToBeModified = props.cardName;
      visibleCards[cardNameToBeModified] = !disabled;
      setDisabled(visibleCards[cardNameToBeModified]);

      // save toggle value in db
      await axios.put(
        backendAddress + "api/profile/" + localStorage.getItem("userId"),
        { visibleCards }
      );
    } catch (error) {
      console.log(error);
    }
  };

  /*
   * Generate Switch Button
   *
   * Generate visibility switch and edit button
   */
  const generateSwitchButton = () => {
    return (
      <div>
        <Row type="flex" gutter={[16, 16]}>
          <Col>
            <Tooltip placement="top" title={"toggle card visibility"}>
              <Switch
                checkedChildren={<EyeOutlined />}
                unCheckedChildren={<EyeInvisibleOutlined />}
                checked={disabled}
                onChange={handleVisibilityToggle}
                style={{ marginTop: "5px" }}
              />
            </Tooltip>
          </Col>
          <Col>
            <Tooltip
              placement="top"
              title={<FormattedMessage id="profile.edit" />}
            >
              <Button type="default" shape="circle" icon={<EditOutlined />} />
            </Tooltip>
          </Col>
        </Row>
      </div>
    );
  };

  useEffect(() => {
    // get default state of card visibility status on load of page
    if (props.profileInfo) {
      let visibleCards = props.profileInfo.visibleCards;
      const cardNameToBeModified = props.cardName;
      setDisabled(visibleCards[cardNameToBeModified]);
    }
  }, [props.profileInfo]);

  let styles;
  if (disabled === true) {
    styles = {
      grayedOut: {
        backgroundColor: ""
      }
    };
  } else {
    styles = {
      grayedOut: {
        backgroundColor: "#D3D3D3"
      }
    };
  }
  return (
    <div>
      <Card
        title={props.title}
        extra={generateSwitchButton(props.cardName)}
        style={(props.style, styles.grayedOut)}
      >
        {props.content}
      </Card>
    </div>
  );
}

export default ProfileCardsView;
