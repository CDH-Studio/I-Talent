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
import AliSelect from "../formItems/AliSelect";

// const { Option } = Select;

const CardVisibilityToggleView = ({ cardName, type, visibleCards }) => {
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
      label: (
        <>
          <EyeOutlined className="mr-1" aria-hidden="true" />
          <FormattedMessage id="visibility.card.public" />
        </>
      ),
    },
    {
      value: "CONNECTIONS",
      label: (
        <>
          <TeamOutlined className="mr-1" aria-hidden="true" />
          <FormattedMessage id="connections" />
        </>
      ),
    },
    {
      value: "PRIVATE",
      label: (
        <>
          <EyeInvisibleOutlined className="mr-1" aria-hidden="true" />
          <FormattedMessage id="visibility.card.private" />
        </>
      ),
    },
  ];

  return (
    <>
      <AliSelect
        inputValue={status}
        className="visibilitySelector"
        isClearable={false}
        options={generateOptions()}
        onChange={handleSelect}
        ariaLabel={intl.formatMessage({ id: "visibility.selector" })}
      />

      {/* <Select
        value={status}
        className="visibilitySelector"
        style={{ width: 120 }}
        onSelect={handleSelect}
        aria-label={intl.formatMessage({ id: "visibility.selector" })}
      >
        <Option
          value="PUBLIC"
          aria-label={intl.formatMessage({ id: "visibility.card.public" })}
        >
          <EyeOutlined className="mr-1" aria-hidden="true" />
          <FormattedMessage id="visibility.card.public" />
        </Option>
        <Option
          value="CONNECTIONS"
          aria-label={intl.formatMessage({ id: "connections" })}
        >
          <TeamOutlined className="mr-1" aria-hidden="true" />
          <FormattedMessage id="connections" />
        </Option>
        <Option
          value="PRIVATE"
          aria-label={intl.formatMessage({ id: "visibility.card.private" })}
        >
          <EyeInvisibleOutlined className="mr-1" aria-hidden="true" />
          <FormattedMessage id="visibility.card.private" />
        </Option>
      </Select> */}
      <AlertDialog
        title={<FormattedMessage id="visibility.card.title" />}
        body={<FormattedMessage id={`visibility.${type}.show.confirm`} />}
        isOpen={modalVisibility}
        onOk={handleVisibilityPublicOk}
        onCancel={handleVisibilityPublicCancel}
        okText={<FormattedMessage id="yes" />}
        cancelText={<FormattedMessage id="no" />}
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
};

export default CardVisibilityToggleView;
