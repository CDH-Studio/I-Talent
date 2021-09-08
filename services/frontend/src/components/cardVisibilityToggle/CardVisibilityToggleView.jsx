import { useCallback, useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Modal, notification } from "antd";
import PropTypes from "prop-types";

import handleError from "../../functions/handleError";
import useAxios from "../../utils/useAxios";
import CustomDropdown from "../formItems/CustomDropdown";

import "./CardVisibilityToggleView.less";

const CardVisibilityToggleView = ({
  cardName,
  type,
  visibleCards,
  ariaLabel,
}) => {
  const axios = useAxios();
  const intl = useIntl();
  const history = useHistory();
  const urlID = useParams().id;
  const userID = useSelector((state) => state.user.id);
  const { locale } = useSelector((state) => state.settings);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [status, setStatus] = useState("PRIVATE");

  /**
   * Read card visibility status
   */
  const getCardStatus = useCallback(async () => {
    if (visibleCards && (urlID === userID || !urlID)) {
      const modifiedCard = cardName;
      setStatus(visibleCards[modifiedCard]);
    }
  }, [visibleCards, urlID, userID, cardName]);

  /**
   * Open success notification on save
   */
  const openNotification = () => {
    notification.success({
      description: intl.formatMessage({
        id: "visibility.confirmation.message",
      }),
      message: intl.formatMessage({
        id: "visibility.confirmation.title",
      }),
      placement: "topRight",
    });
  };

  /**
   * Handel the change in visibility
   * save the selected visibility to backend
   * @param {Object} value - value selected from dropdown
   */
  const handleVisibilityToggle = async (value) => {
    // eslint-disable-next-line no-param-reassign
    visibleCards[cardName] = value;
    await axios
      .put(`api/profile/${urlID || userID}?language=${locale}`, {
        visibleCards,
      })
      .then(() => {
        openNotification();
        setStatus(value);
      })
      .catch((error) => handleError(error, "message", history));
  };

  /**
   * Handel selection change in drop down
   * open modal confirmation if "public" is selected
   * @param {Object} value - value selected from dropdown
   */
  const handleSelect = (value) => {
    if (value === "PUBLIC") {
      setIsModalVisible(true);
    } else {
      handleVisibilityToggle(value);
    }
  };

  /**
   * Handel public visibility confirmation
   * save the value, hide modal, and show notification
   */
  const handleVisibilityPublicOk = () => {
    handleVisibilityToggle("PUBLIC");
    setIsModalVisible(false);
  };

  /**
   * Handel public visibility cancellation
   * hide the modal
   */
  const handleVisibilityPublicCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    getCardStatus();
  }, [getCardStatus]);

  const generateOptions = () => [
    {
      icon: <EyeOutlined aria-hidden="true" className="mr-1" />,
      label: intl.formatMessage({ id: "visibility.card.public" }),
      value: "PUBLIC",
    },
    {
      icon: <TeamOutlined aria-hidden="true" className="mr-1" />,
      label: intl.formatMessage({ id: "connections" }),
      value: "CONNECTIONS",
    },
    {
      icon: <EyeInvisibleOutlined aria-hidden="true" className="mr-1" />,
      label: intl.formatMessage({ id: "visibility.card.private" }),
      value: "PRIVATE",
    },
  ];

  return (
    <>
      <CustomDropdown
        ariaLabel={`${ariaLabel} ${intl.formatMessage({
          id: "visibility.selector",
        })}`}
        blurInputOnSelect
        className="visibilitySelector"
        inputValue={status}
        isClearable={false}
        isSearchable={false}
        onChange={handleSelect}
        options={generateOptions()}
      />
      <Modal
        cancelText={
          <>
            <CloseCircleOutlined aria-hidden="true" className="mr-1" />
            <FormattedMessage id="no" />
          </>
        }
        closable={false}
        maskClosable={false}
        okText={
          <>
            <CheckCircleOutlined aria-hidden="true" className="mr-1" />
            <FormattedMessage id="yes" />
          </>
        }
        onCancel={handleVisibilityPublicCancel}
        onOk={handleVisibilityPublicOk}
        title={
          <>
            <ExclamationCircleOutlined
              aria-hidden="true"
              className="mr-2 warning-text"
            />
            <FormattedMessage id="visibility.card.title" />
          </>
        }
        visible={isModalVisible}
      >
        <FormattedMessage id={`visibility.${type}.show.confirm`} />
      </Modal>
    </>
  );
};

CardVisibilityToggleView.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  cardName: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["form", "card"]).isRequired,
  visibleCards: PropTypes.objectOf(
    PropTypes.oneOf(["PRIVATE", "CONNECTIONS", "PUBLIC"])
  ).isRequired,
};

export default CardVisibilityToggleView;
