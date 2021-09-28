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

import handleError from "../../functions/handleError";
import useAxios from "../../utils/useAxios";

import "./ProfileActionRibbonView.less";

const ProfileActionRibbonView = ({
  children,
  connectionStatus,
  loggedInUserId,
  userId,
}) => {
  const [isConnection, setIsConnection] = useState(connectionStatus);

  const history = useHistory();
  const intl = useIntl();
  const axios = useAxios();
  
  /*
   * Change Connection
   *
   * Adds or removes someone as a connection
   */
  const changeConnection = async () => {
    if (isConnection) {
      await axios
        .delete(`api/connections/${userId}`)
        .catch((error) => handleError(error, "message", history));
      setIsConnection(false);
    } else {
      await axios
        .post(`api/connections/${userId}`)
        .catch((error) => handleError(error, "message", history));
      setIsConnection(true);
    }
  };

  /*
   * Get Action Ribbon Button
   *
   * Retrieves the ribbon button for adding/removing a user from one's circle
   */
  const getActionRibbonBtn = () => {
    if (userId === loggedInUserId) {
      return (
        <Button
          aria-label={intl.formatMessage({ id: "edit.profile" })}
          block
          className="ribbon-btn"
          icon={<EditOutlined aria-hidden="true" className="ribbon-btn-icon" />}
          onClick={(e) => {
            e.stopPropagation();
            history.push("/profile/edit/primary-info");
          }}
          tabIndex={0}
          type="link"
        >
          <FormattedMessage id="edit.profile" />
        </Button>
      );
    };

    return (
      <Button
        aria-label={
          isConnection ? (
            intl.formatMessage({ id: "remove.connection" })
          ) : (
            intl.formatMessage({ id: "add.connection" })
          )
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
        onClick={(e) => {
          e.stopPropagation();
          changeConnection();
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

  return (
    <Badge.Ribbon
      color={isConnection && (userId !== loggedInUserId) ? "#192E2F" : "#1D807B"}
      style={{ padding: 0 }}
      text={getActionRibbonBtn()}
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
