import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import CardVisibilityToggleView from "./CardVisibilityToggleView";
import useAxios from "../../utils/useAxios";
import handleError from "../../functions/handleError";

const CardVisibilityToggle = ({ visibleCards, cardName, type }) => {
  const [status, setStatus] = useState("PRIVATE");
  const axios = useAxios();

  const urlID = useParams().id;
  const { locale } = useSelector((state) => state.settings);
  const userID = useSelector((state) => state.user.id);

  const getCardStatus = useCallback(async () => {
    if (visibleCards && (urlID === userID || !urlID)) {
      const modifiedCard = cardName;
      setStatus(visibleCards[modifiedCard]);
    }
  }, [visibleCards, urlID, userID, cardName]);

  const handleVisibilityTogglezz = async (value) => {
    // eslint-disable-next-line no-param-reassign
    visibleCards[cardName] = value;
    await axios
      .put(`api/profile/${urlID || userID}?language=${locale}`, {
        visibleCards,
      })
      .catch((error) => handleError(error, "message"));
    setStatus(value);
  };

  useEffect(() => {
    getCardStatus();
  }, [getCardStatus]);
  return (
    <CardVisibilityToggleView
      status={status}
      //handleVisibilityToggle={handleVisibilityToggle}
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
