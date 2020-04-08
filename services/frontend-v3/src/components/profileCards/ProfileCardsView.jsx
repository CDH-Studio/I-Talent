import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Card, Switch, Button, Row, Col, Tooltip } from "antd";
import { FormattedMessage } from "react-intl";

import axios from "axios";
import config from "../../config";
const { backendAddress } = config;

function ProfileCardsView(props) {
  const history = useHistory();
  const [disabled, setDisabled] = useState(true);

  //useParams returns an object of key/value pairs from URL parameters
  const { id } = useParams();
  const urlID = id;
  const userID = localStorage.getItem("userId");

  /*
   * Handle Visibility Toggle
   *
   * Handle card visibility toggle by updating state and saving state to backend
   */
  const handleVisibilityToggle = async () => {
    // Update visibleCards state in profile
    try {
      // Get current card visibility status from db
      let url = backendAddress + "api/profile/" + urlID;
      let result = await axios.get(url);
      let visibleCards = result.data.visibleCards;

      // change the stored value
      const cardNameToBeModified = props.cardName;
      visibleCards[cardNameToBeModified] = !disabled;
      setDisabled(visibleCards[cardNameToBeModified]);

      // save toggle value in db
      await axios.put(backendAddress + "api/profile/" + urlID, {
        visibleCards,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /*
   * Handle Visibility Toggle
   *
   * Handle card visibility toggle by updating state and saving state to backend
   */
  const redirectToEdit = () => {
    console.log("props.editUrl");
    console.log(props.editUrl);
    if (props.editUrl) {
      history.push(props.editUrl);
    }
  };

  /*
   * Generate Switch Button
   *
   * Generate visibility switch and edit button
   */
  const generateSwitchButton = () => {
    //Check if user is on his own profile (by
    // comparing the id in storage vs the id in the url)
    if (userID === urlID) {
      return (
        <div style={{ marginTop: "15px" }}>
          <Row type="flex" gutter={[16, 16]}>
            <Col>
              <Tooltip
                placement="top"
                title={<FormattedMessage id="profile.toggle.card.visibility" />}
              >
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
                <Button
                  type="default"
                  shape="circle"
                  icon={<EditOutlined />}
                  onClick={redirectToEdit}
                />
              </Tooltip>
            </Col>
          </Row>
        </div>
      );
    }
  };

  useEffect(() => {
    // get default state of card visibility status on load of page
    if (props.profileInfo) {
      let visibleCards = props.profileInfo.visibleCards;
      const cardNameToBeModified = props.cardName;
      setDisabled(visibleCards[cardNameToBeModified]);
    }
  }, [props]);

  let styles;
  if (disabled === true) {
    styles = {
      grayedOut: {
        backgroundColor: "",
      },
    };
  } else {
    styles = {
      grayedOut: {
        backgroundColor: "#D3D3D3",
      },
    };
  }

  return (
    <div>
      <Card
        title={props.title}
        id={props.id}
        extra={generateSwitchButton(props.cardName)}
        style={(props.style, styles.grayedOut)}
      >
        {props.content}
      </Card>
    </div>
  );
}

export default ProfileCardsView;
