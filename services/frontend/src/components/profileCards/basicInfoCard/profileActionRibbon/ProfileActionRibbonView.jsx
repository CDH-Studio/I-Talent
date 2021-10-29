import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import {
  EditOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { Badge, Button } from "antd";
import PropTypes from "prop-types";

import handleError from "../../../../functions/handleError";
import useAxios from "../../../../utils/useAxios";

import "./ProfileActionRibbonView.less";

/**
 * Retrieves the ribbon button for adding/removing a user from one's circle,
 * or the edit button which is a link to the edit profile page
 * @param {Object} prop - component props
 * @param {Object} prop.history - history for redirect
 * @param {boolean} prop.isConnection - is user a connection
 * @param {string} prop.loggedInUserId- Id of logged in user
 * @param {function} prop.onClick - onClick callback function
 * @param {string} prop.userIdOfProfile- Id of profile being visitted
 */
/* eslint-disable react/prop-types */
const ActionRibbonBtn = ({
  history,
  isConnection,
  loggedInUserId,
  onClick,
  userIdOfProfile,
}) => {
  const intl = useIntl();

  return userIdOfProfile === loggedInUserId ? (
    <Button
      aria-label={intl.formatMessage({ id: "edit.profile" })}
      block
      className="ribbon-btn"
      icon={<EditOutlined aria-hidden="true" className="ribbon-btn-icon" />}
      onClick={() => {
        history.push("/profile/edit/primary-info");
      }}
      tabIndex={0}
      type="link"
    >
      <FormattedMessage id="edit.profile" />
    </Button>
  ) : (
    <Button
      aria-label={
        isConnection
          ? intl.formatMessage({ id: "remove.connection" })
          : intl.formatMessage({ id: "add.connection" })
      }
      block
      className="ribbon-btn"
      icon={
        isConnection ? (
          <UserDeleteOutlined aria-hidden="true" className="ribbon-btn-icon" />
        ) : (
          <UserAddOutlined aria-hidden="true" className="ribbon-btn-icon" />
        )
      }
      onClick={() => {
        onClick();
      }}
      tabIndex={0}
      type="link"
    >
      {isConnection ? (
        <FormattedMessage id="remove.connection" />
      ) : (
        <FormattedMessage id="add.connection" />
      )}
    </Button>
  );
};
/* eslint-enable react/prop-types */

const ProfileActionRibbonView = ({
  children,
  connectionStatus,
  loggedInUserId,
  userId,
}) => {
  const history = useHistory();
  const axios = useAxios();
  const [isConnection, setIsConnection] = useState(connectionStatus);

  /**
   * Change Connection
   * Adds or removes someone as a connection
   */
  const changeConnection = async () => {
    if (isConnection) {
      await axios
        .delete(`connections/${userId}`)
        .catch((error) => handleError(error, "message", history));
      setIsConnection(false);
    } else {
      await axios
        .post(`connections/${userId}`)
        .catch((error) => handleError(error, "message", history));
      setIsConnection(true);
    }
  };

  return (
    <Badge.Ribbon
      className="py-0 px-2"
      color={isConnection && userId !== loggedInUserId ? "#192E2F" : "#1D807B"}
      text={
        <>
          <ActionRibbonBtn
            connectionStatus={connectionStatus}
            history={history}
            isConnection={isConnection}
            loggedInUserId={loggedInUserId}
            onClick={changeConnection}
            userIdOfProfile={userId}
          />
        </>
      }
    >
      {children}
    </Badge.Ribbon>
  );
};

ProfileActionRibbonView.propTypes = {
  children: PropTypes.element,
  connectionStatus: PropTypes.bool.isRequired,
  loggedInUserId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

ProfileActionRibbonView.defaultProps = {
  children: null,
};

export default ProfileActionRibbonView;
