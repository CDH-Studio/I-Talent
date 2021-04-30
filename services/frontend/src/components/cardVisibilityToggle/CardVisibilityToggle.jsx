import { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory, useParams } from "react-router";
import { useSelector } from "react-redux";
import CardVisibilityToggleView from "./CardVisibilityToggleView";
import useAxios from "../../utils/useAxios";
import handleError from "../../functions/handleError";

const CardVisibilityToggle = ({ visibleCards, cardName, type }) => {
  const history = useHistory();
  const axios = useAxios();
  const urlID = useParams().id;
  const userID = useSelector((state) => state.user.id);
  const { locale } = useSelector((state) => state.settings);

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
   * Handel the change in visibility
   * save the selected visibility to backend
   * @param {Object} value - value selected from dropdown
   */
  const handleVisibilityToggle = async (value) => {
    // eslint-disable-next-line no-param-reassign
    visibleCards[cardName] = value;
    await axios
      .put(`profile/${urlID || userID}?language=${locale}`, {
        visibleCards,
      })
      .catch((error) => handleError(error, "message", history));
    setStatus(value);
  };

  useEffect(() => {
    getCardStatus();
  }, [getCardStatus]);

  return (
    <CardVisibilityToggleView
      status={status}
      handleVisibilityToggle={handleVisibilityToggle}
      type={type}
    />
  );
};

CardVisibilityToggle.propTypes = {
  visibleCards: PropTypes.objectOf(
    PropTypes.oneOf(["PRIVATE", "CONNECTIONS", "PUBLIC"])
  ).isRequired,
  cardName: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["form", "card"]),
};

CardVisibilityToggle.defaultProps = {
  type: "card",
};

export default CardVisibilityToggle;
