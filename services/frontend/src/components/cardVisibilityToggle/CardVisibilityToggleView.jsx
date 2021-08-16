import { useState, useCallback, useEffect } from "react";
import { notification } from "antd";
import {
  EyeInvisibleOutlined,
  TeamOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { FormattedMessage, useIntl } from "react-intl";
import { useHistory, useParams } from "react-router";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import "./CardVisibilityToggleView.less";
import AlertDialog from "../modal/AlertDialog";
import useAxios from "../../utils/useAxios";
import handleError from "../../functions/handleError";
import CustomDropdown from "../formItems/CustomDropdown";

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
  const [modalVisibility, setModalVisibility] = useState(false);
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
      message: intl.formatMessage({
        id: "visibility.confirmation.title",
      }),
      description: intl.formatMessage({
        id: "visibility.confirmation.message",
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
      setModalVisibility(true);
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
    setModalVisibility(false);
  };

  /**
   * Handel public visibility cancellation
   * hide the modal
   */
  const handleVisibilityPublicCancel = () => {
    setModalVisibility(false);
  };

  useEffect(() => {
    getCardStatus();
  }, [getCardStatus]);

  const generateOptions = () => [
    {
      value: "PUBLIC",
      label: intl.formatMessage({ id: "visibility.card.public" }),
      icon: <EyeOutlined aria-hidden="true" className="mr-1" />,
    },
    {
      value: "CONNECTIONS",
      label: intl.formatMessage({ id: "connections" }),
      icon: <TeamOutlined aria-hidden="true" className="mr-1" />,
    },
    {
      value: "PRIVATE",
      label: intl.formatMessage({ id: "visibility.card.private" }),
      icon: <EyeInvisibleOutlined aria-hidden="true" className="mr-1" />,
    },
  ];

  return (
    <>
      <CustomDropdown
        ariaLabel={`${ariaLabel} ${intl.formatMessage({
          id: "visibility.selector",
        })}`}
        className="visibilitySelector"
        inputValue={status}
        isClearable={false}
        isSearchable={false}
        onChange={handleSelect}
        options={generateOptions()}
      />
      <AlertDialog
        body={<FormattedMessage id={`visibility.${type}.show.confirm`} />}
        cancelText={<FormattedMessage id="no" />}
        isOpen={modalVisibility}
        okText={<FormattedMessage id="yes" />}
        onCancel={handleVisibilityPublicCancel}
        onOk={handleVisibilityPublicOk}
        title={<FormattedMessage id="visibility.card.title" />}
      />
    </>
  );
};

CardVisibilityToggleView.propTypes = {
  visibleCards: PropTypes.objectOf(
    PropTypes.oneOf(["PRIVATE", "CONNECTIONS", "PUBLIC"])
  ).isRequired,
  cardName: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["form", "card"]).isRequired,
  ariaLabel: PropTypes.string.isRequired,
};

export default CardVisibilityToggleView;
