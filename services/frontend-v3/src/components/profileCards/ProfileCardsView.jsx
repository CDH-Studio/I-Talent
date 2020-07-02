import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  EditOutlined,
  WarningOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Card, Button, Row, Col, Tooltip, Popconfirm, Radio } from "antd";
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
}) => {
  const [status, setStatus] = useState("");

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
  const handleVisibilityToggle = async (value) => {
    // Update visibleCards state in profile
    const { visibleCards } = profileInfo;
    const modifiedCard = cardName;
    visibleCards[modifiedCard] = value;
    setStatus(value);

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
              <Radio.Group value={status} buttonStyle="solid" size="middle">
                <Tooltip
                  placement="bottom"
                  title={<FormattedMessage id="profile.visibleCards.public" />}
                >
                  <Popconfirm
                    title={
                      <FormattedMessage id="profile.visibility.show.confirm" />
                    }
                    placement="topRight"
                    okText={<FormattedMessage id="profile.yes" />}
                    cancelText={<FormattedMessage id="profile.no" />}
                    icon={<WarningOutlined style={{ color: "orange" }} />}
                    onConfirm={() => handleVisibilityToggle("PUBLIC")}
                  >
                    <Radio.Button value="PUBLIC">
                      <EyeOutlined />
                    </Radio.Button>
                  </Popconfirm>
                </Tooltip>
                <Tooltip
                  placement="bottom"
                  title={<FormattedMessage id="profile.visibleCards.friends" />}
                >
                  <Popconfirm
                    title={
                      <FormattedMessage id="profile.visibility.friends.confirm" />
                    }
                    placement="topRight"
                    okText={<FormattedMessage id="profile.yes" />}
                    cancelText={<FormattedMessage id="profile.no" />}
                    icon={<WarningOutlined style={{ color: "orange" }} />}
                    onConfirm={() => handleVisibilityToggle("FRIENDS")}
                  >
                    <Radio.Button value="FRIENDS">
                      <TeamOutlined />
                    </Radio.Button>
                  </Popconfirm>
                </Tooltip>
                <Tooltip
                  placement="bottom"
                  title={<FormattedMessage id="profile.visibleCards.private" />}
                >
                  <Popconfirm
                    title={
                      <FormattedMessage id="profile.visibility.hide.confirm" />
                    }
                    placement="topRight"
                    okText={<FormattedMessage id="profile.yes" />}
                    cancelText={<FormattedMessage id="profile.no" />}
                    icon={<WarningOutlined style={{ color: "orange" }} />}
                    onConfirm={() => handleVisibilityToggle("PRIVATE")}
                  >
                    <Radio.Button value="PRIVATE">
                      <EyeInvisibleOutlined />
                    </Radio.Button>
                  </Popconfirm>
                </Tooltip>
              </Radio.Group>
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
    if (profileInfo) {
      const { visibleCards } = profileInfo;
      const modifiedCard = cardName;
      setStatus(visibleCards[modifiedCard]);
    }
  }, [cardName, editUrl, profileInfo, title, id, content, style]);

  let styles;

  if (status === "PRIVATE") {
    styles = {
      grayedOut: {
        backgroundColor: "#D3D3D3",
      },
    };
  } else {
    styles = {
      grayedOut: {
        backgroundColor: "",
      },
    };
  }

  return (
    <div>
      <Card
        className={content === null ? "no-content-card" : null}
        title={title}
        id={id}
        extra={generateSwitchButton()}
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
};

ProfileCardsView.defaultProps = {
  profileInfo: {},
  style: undefined,
  content: null,
};

export default ProfileCardsView;
