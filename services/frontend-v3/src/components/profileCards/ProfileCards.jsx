import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileCardsView from "./ProfileCardsView";
import { ProfileInfoPropType } from "../../customPropTypes";
import axios from "../../axios-instance";
import handleError from "../../functions/handleError";

const ProfileCards = ({
  data,
  title,
  content,
  editUrl,
  cardName,
  id,
  type,
  visible,
}) => {
  const history = useHistory();
  const [status, setStatus] = useState("");

  const newId = useParams().id;
  const urlID = newId;
  const { locale } = useSelector((state) => state.settings);

  const getCardStatus = useCallback(async () => {
    if (data) {
      const { visibleCards } = data;
      const modifiedCard = cardName;
      setStatus(visibleCards[modifiedCard]);
    }
  }, [data, cardName]);

  const handleVisibilityToggle = async (value) => {
    const { visibleCards } = data;
    const modifiedCard = cardName;
    visibleCards[modifiedCard] = value;
    await axios
      .put(`api/profile/${urlID}?language=${locale}`, {
        visibleCards,
      })
      .catch((error) => handleError(error, "message"));
    getCardStatus();
  };

  useEffect(() => {
    getCardStatus();
  });

  return (
    <ProfileCardsView
      title={title}
      content={content}
      data={data}
      editUrl={editUrl}
      cardName={cardName}
      id={id}
      history={history}
      type={type}
      visible={visible}
      status={status}
      handleVisibilityToggle={handleVisibilityToggle}
    />
  );
};

ProfileCards.propTypes = {
  data: ProfileInfoPropType,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  content: PropTypes.element,
  editUrl: PropTypes.string,
  cardName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.bool,
  visible: PropTypes.bool,
};

ProfileCards.defaultProps = {
  data: null,
  content: null,
  editUrl: null,
  type: null,
  visible: null,
};

export default ProfileCards;
