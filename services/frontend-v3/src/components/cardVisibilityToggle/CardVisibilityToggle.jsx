import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import CardVisibilityToggleView from "./CardVisibilityToggleView";
import axios from "../../axios-instance";
import handleError from "../../functions/handleError";

const CardVisibilityToggle = ({ visibleCards, cardName }) => {
  const [status, setStatus] = useState("");

  const urlID = useParams().id;
  const { locale } = useSelector((state) => state.settings);
  const userID = useSelector((state) => state.user.id);

  const getCardStatus = useCallback(async () => {
    if (visibleCards && (urlID === userID || !urlID)) {
      const modifiedCard = cardName;
      setStatus(visibleCards[modifiedCard]);
    }
  }, [visibleCards, urlID, userID, cardName]);

  const handleVisibilityToggle = async (value) => {
    const modifiedCardVisibility = {
      ...visibleCards,
      [cardName]: value,
    };
    await axios
      .put(`api/profile/${urlID || userID}?language=${locale}`, {
        visibleCards: modifiedCardVisibility,
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
      handleVisibilityToggle={handleVisibilityToggle}
    />
  );
};

CardVisibilityToggle.propTypes = {
  visibleCards: PropTypes.objectOf(
    PropTypes.oneOf(["PRIVATE", "CONNECTIONS", "PUBLIC"])
  ).isRequired,
  cardName: PropTypes.string.isRequired,
};

export default CardVisibilityToggle;
