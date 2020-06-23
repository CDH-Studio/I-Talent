import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  EditOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Card, Switch, Button, Row, Col, Tooltip, Popconfirm } from "antd";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";

import axios from "axios";
import { ProfileInfoPropType, HistoryPropType } from "../../customPropTypes";
import config from "../../config";
import handleError from "../../functions/handleError";

const { backendAddress } = config;

const ProfileCardsView = ({
  cardName,
  editUrl,
  profileInfo,
  title,
  id,
  content,
  style,
  history,
  forceDisabled,
}) => {
  const [disabled, setDisabled] = useState(true);

  // useParams returns an object of key/value pairs from URL parameters
  const newId = useParams().id;
  const urlID = newId;
  const userID = useSelector((state) => state.user.id);
  const { locale } = useSelector((state) => state.settings);

  /*
   * Handle Visibility Toggle
   *
   * Handle card visibility toggle by updating state and saving state to backend
   */
  const handleVisibilityToggle = async () => {
    // Update visibleCards state in profile
    const { visibleCards } = profileInfo;

    // change the stored value
    const cardNameToBeModified = cardName;
    visibleCards[cardNameToBeModified] = !disabled;
    setDisabled(visibleCards[cardNameToBeModified]);

    // save toggle value in db
    await axios
      .put(`${backendAddress}api/profile/${urlID}?language=${locale}`, {
        visibleCards,
      })
      .catch((error) => handleError(error, "message"));
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
   * Get Pop Confirm Title
   *
   * Get title of pop confirm based on current toggle position
   */
  const getPopConfirmTitle = (visibilityBool) => {
    // if user wants to hide profile
    if (visibilityBool) {
      return <FormattedMessage id="profile.visibility.hide.confirm" />;
    }
    return <FormattedMessage id="profile.visibility.show.confirm" />;
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
              <Popconfirm
                title={getPopConfirmTitle(disabled)}
                okText={<FormattedMessage id="profile.yes" />}
                cancelText={<FormattedMessage id="profile.no" />}
                icon={<WarningOutlined style={{ color: "orange" }} />}
                onConfirm={handleVisibilityToggle}
                placement="topRight"
                disabled={forceDisabled}
              >
                <Switch
                  aria-label="visibility toggle"
                  checkedChildren={<EyeOutlined />}
                  unCheckedChildren={<EyeInvisibleOutlined />}
                  checked={disabled && !forceDisabled}
                  style={{ marginTop: "5px" }}
                  disabled={forceDisabled}
                />
              </Popconfirm>
            </Col>

            <Col>
              <Tooltip
                placement="top"
                title={<FormattedMessage id="profile.edit" />}
              >
                <Button
                  aria-label="edit card"
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
  history: HistoryPropType.isRequired,
  forceDisabled: PropTypes.bool,
};

ProfileCardsView.defaultProps = {
  profileInfo: {},
  style: undefined,
  content: null,
  forceDisabled: false,
};

export default ProfileCardsView;
