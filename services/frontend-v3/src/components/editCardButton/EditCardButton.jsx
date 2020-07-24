import React from "react";
import { useHistory } from "react-router";
import PropTypes from "prop-types";
import EditCardButtonView from "./EditCardButtonView";

const EditCardButton = ({ editUrl }) => {
  const history = useHistory();

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

  return <EditCardButtonView redirectToEdit={redirectToEdit} />;
};

EditCardButton.propTypes = {
  editUrl: PropTypes.string.isRequired,
};

export default EditCardButton;
