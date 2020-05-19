import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams, useHistory } from "react-router-dom";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Card, Switch, Button, Row, Col, Tooltip } from "antd";
import { FormattedMessage } from "react-intl";
import ProfileCardsError from "./profileCardsError/ProfileCardsError";
import {
  ProfileInfoPropType,
  NetworkErrorsPropType,
} from "../../customPropTypes";

function ProfileCardsView({
  cardName,
  editUrl,
  profileInfo,
  title,
  id,
  content,
  style,
  handleVisibilityToggle,
  networkErrors,
  disabled,
  setDisabled,
}) {
  const history = useHistory();

  // useParams returns an object of key/value pairs from URL parameters
  const newId = useParams().id;
  const urlID = newId;
  const userID = localStorage.getItem("userId");

  /*
   * Handle Visibility Toggle
   *
   * Handle card visibility toggle by updating state and saving state to backend
   */
  const redirectToEdit = () => {
    if (editUrl) {
      history.push(editUrl);
    }
  };

  /*
   * Generate Switch Button
   *
   * Generate visibility switch and edit button
   */
  // eslint-disable-next-line consistent-return
  const generateSwitchButton = () => {
    // Check if user is on his own profile (by
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
    if (profileInfo) {
      const { visibleCards } = profileInfo;
      const cardNameToBeModified = cardName;
      setDisabled(visibleCards[cardNameToBeModified]);
    }
  }, [cardName, editUrl, profileInfo, setDisabled, title, id, content, style]);

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
  if (networkErrors && networkErrors.length) {
    return <ProfileCardsError networkErrors={networkErrors} title={title} />;
  }
  return (
    <div>
      <Card
        title={title}
        id={id}
        extra={generateSwitchButton(cardName)}
        style={(style, styles.grayedOut)}
      >
        {content}
      </Card>
    </div>
  );
}

ProfileCardsView.propTypes = {
  cardName: PropTypes.string.isRequired,
  editUrl: PropTypes.string.isRequired,
  profileInfo: ProfileInfoPropType,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  id: PropTypes.string.isRequired,
  content: PropTypes.element.isRequired,
  style: PropTypes.objectOf(PropTypes.string),
  networkErrors: NetworkErrorsPropType.isRequired,
};

ProfileCardsView.defaultProps = {
  profileInfo: null,
  style: undefined,
};

export default ProfileCardsView;
