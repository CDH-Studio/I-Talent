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
import { useSelector } from "react-redux";

import axios from "axios";
import { ProfileInfoPropType } from "../../customPropTypes";
import config from "../../config";

const { backendAddress } = config;

const ProfileCardsView = ({
  cardName,
  editUrl,
  profileInfo,
  title,
  id,
  content,
  style,
  forceDisabled,
}) => {
  const history = useHistory();
  const [disabled, setDisabled] = useState(true);

  // useParams returns an object of key/value pairs from URL parameters
  const newId = useParams().id;
  const urlID = newId;
  const userID = useSelector((state) => state.user.id);

  /*
   * Handle Visibility Toggle
   *
   * Handle card visibility toggle by updating state and saving state to backend
   */
  const handleVisibilityToggle = async () => {
    // Update visibleCards state in profile
    try {
      // Get current card visibility status from db
      const url = `${backendAddress}api/profile/${urlID}`;
      const result = await axios.get(url);
      const { visibleCards } = result.data;

      // change the stored value
      const cardNameToBeModified = cardName;
      visibleCards[cardNameToBeModified] = !disabled;
      setDisabled(visibleCards[cardNameToBeModified]);

      // save toggle value in db
      await axios.put(`${backendAddress}api/profile/${urlID}`, {
        visibleCards,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

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
                  aria-label="visibility toggle"
                  checkedChildren={<EyeOutlined />}
                  unCheckedChildren={<EyeInvisibleOutlined />}
                  checked={disabled && !forceDisabled}
                  onChange={handleVisibilityToggle}
                  style={{ marginTop: "5px" }}
                  disabled={forceDisabled}
                />
              </Tooltip>
            </Col>

            <Col>
              <Tooltip
                placement="top"
                title={<FormattedMessage id="profile.edit" />}
              >
                <Button
                  aria-label="visibility toggle"
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
      setDisabled(visibleCards[cardNameToBeModified] && !forceDisabled);
    }
  }, [
    cardName,
    editUrl,
    profileInfo,
    title,
    id,
    content,
    style,
    forceDisabled,
  ]);

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
        className={content === null ? "no-content-card" : null}
        title={title}
        id={id}
        extra={generateSwitchButton(cardName)}
        style={(style, styles.grayedOut)}
      >
        {content}
      </Card>
    </div>
  );
};

ProfileCardsView.propTypes = {
  cardName: PropTypes.string.isRequired,
  editUrl: PropTypes.string.isRequired,
  profileInfo: ProfileInfoPropType,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  id: PropTypes.string.isRequired,
  content: PropTypes.element,
  style: PropTypes.objectOf(PropTypes.string),
  forceDisabled: PropTypes.bool,
};

ProfileCardsView.defaultProps = {
  profileInfo: null,
  style: undefined,
  content: null,
  forceDisabled: false,
};

export default ProfileCardsView;
