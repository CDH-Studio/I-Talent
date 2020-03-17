import React, { useState } from "react";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  EditOutlined
} from "@ant-design/icons";
import "@ant-design/compatible/assets/index.css";
import { Card, Switch, Button, Row, Col } from "antd";
import { FormattedMessage } from "react-intl";

import axios from "axios";
import config from "../../config";
const { backendAddress } = config;

function ProfileCardsView(props) {
  const [disabled, setDisabled] = useState(true);

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
  const handleToggle = async toggleValue => {
    let visibleCards = props.profileInfo.visibleCards;
    const cardNameToBeModified = props.cardName;
    setDisabled(toggleValue);

    visibleCards[cardNameToBeModified] = !disabled;

    console.log("visibleCards==>Object ", { visibleCards });

    //Update visibleCards state in profile
    try {
      await axios.put(
        backendAddress + "api/profile/" + localStorage.getItem("userId"),
        { visibleCards }
        // {
        //   visibleCards: {
        //     info: false,
        //     manager: false,
        //     talentManagement: false,
        //     officialLanguage: false,
        //     skills: false,
        //     competencies: false,
        //     developmentalGoals: false,
        //     education: false,
        //     experience: false,
        //     projects: false,
        //     careerInterests: false,
        //     mentorshipSkills: false
        //   }
        // }
      );
    } catch (error) {
      console.log(error);
    }
  };

  // let toogleValue = getToggleValue(cardName);

  const generateSwitchButton = cardName => {
    console.log("toggle ==>", disabled, "Card ==>", cardName);

    if (props.load) {
      let toogleValue = getToggleValue(cardName);
      // setDisabled(toogleValue);
      if (disabled == true || disabled == false) {
        return (
          <div>
            <Row type="flex" gutter={[16, 16]}>
              <Col>
                <Switch
                  // checkedChildren={<EyeOutlined />}
                  // unCheckedChildren={<EyeInvisibleOutlined />}
                  checkedChildren={"Hide card"}
                  unCheckedChildren={"Show card"}
                  defaultChecked={toogleValue}
                  onClick={handleToggle}
                />
              </Col>
              <Col>
                <Button type="primary" icon={<EditOutlined />}>
                  {<FormattedMessage id="profile.edit" />}
                </Button>
              </Col>
            </Row>
          </div>
        );
      }
    }
  };

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
        style={props.style}
        bodyStyle={styles.grayedOut}
      >
        {props.content}
      </Card>
    </div>
  );
}

export default ProfileCardsView;
