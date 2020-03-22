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
  // let [visibleCards, setVisibleCards] = useState(
  //   props.profileInfo.visibleCards
  // );

  const getToggleValue = () => {
    let toggleValue;

    if (props.load && props.profileInfo) {
      switch (props.cardName) {
        case "info":
          toggleValue = props.profileInfo.visibleCards.info;
          break;
        case "manager":
          toggleValue = props.profileInfo.visibleCards.manager;
          break;
        case "talentManagement":
          toggleValue = props.profileInfo.visibleCards.talentManagement;
          break;
        case "officialLanguage":
          toggleValue = props.profileInfo.visibleCards.officialLanguage;
          break;
        case "skills":
          toggleValue = props.profileInfo.visibleCards.skills;
          break;
        case "mentorshipSkills":
          toggleValue = props.profileInfo.visibleCards.mentorshipSkills;
          break;
        case "competencies":
          toggleValue = props.profileInfo.visibleCards.competencies;
          break;
        case "developmentalGoals":
          toggleValue = props.profileInfo.visibleCards.developmentalGoals;
          break;
        case "education":
          toggleValue = props.profileInfo.visibleCards.education;
          break;
        case "experience":
          toggleValue = props.profileInfo.visibleCards.experience;
          break;
        case "projects":
          toggleValue = props.profileInfo.visibleCards.projects;
          break;
        case "careerInterests":
          toggleValue = props.profileInfo.visibleCards.careerInterests;
      }
    }
    return toggleValue;
  };

  /* Handle card hidden features */
  // let visibleCards;
  const handleToggle = async toggleValue => {
    let visibleCards = props.profileInfo.visibleCards;
    console.log("state--initial-->1", visibleCards);
    const cardNameToBeModified = props.cardName;
    setDisabled(toggleValue);

    visibleCards[cardNameToBeModified] = toggleValue;

    //Update visibleCards state in profile
    try {
      await axios
        .put(backendAddress + "api/profile/" + localStorage.getItem("userId"), {
          visibleCards
        })
        .then(async () => {
          let url =
            backendAddress + "api/profile/" + localStorage.getItem("userId");
          let result = await axios.get(url);
          let updatedProfileInfo = result.data;
          visibleCards = updatedProfileInfo.visibleCards;
          console.log("state--updated-->69", visibleCards);
        });
    } catch (error) {
      console.log(error);
    }
    //Get updated visibleCards state in profile
  };

  /* Handle card hidden features */
  // let visibleCards;
  const onChange = async () => {
    let url = backendAddress + "api/profile/" + localStorage.getItem("userId");
    let result = await axios.get(url);
    console.log(result);
    let visibleCards = result.data.visibleCards;
    const cardNameToBeModified = props.cardName;
    await setDisabled(!disabled);
    visibleCards[cardNameToBeModified] = !disabled;

    console.log(visibleCards);

    //Update visibleCards state in profile
    try {
      await axios.put(
        backendAddress + "api/profile/" + localStorage.getItem("userId"),
        {
          visibleCards
        }
      );
    } catch (error) {
      console.log(error);
    }
    //Get updated visibleCards state in profile
  };

  const generateSwitchButton = cardName => {
    if (props.load) {
      if (disabled == true || disabled == false) {
        return (
          <div>
            <Row type="flex" gutter={[16, 16]}>
              <Col>
                <Tooltip placement="top" title={"toggle card visibility"}>
                  <Switch
                    checkedChildren={<EyeOutlined />}
                    unCheckedChildren={<EyeInvisibleOutlined />}
                    defaultChecked={disabled}
                    onChange={onChange}
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
                  />
                </Tooltip>
              </Col>
            </Row>
          </div>
        );
      }
    }
  };

  useEffect(() => {
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
