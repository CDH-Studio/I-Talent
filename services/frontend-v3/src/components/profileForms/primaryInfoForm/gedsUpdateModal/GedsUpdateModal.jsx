import React from "react";
import PropTypes from "prop-types";
import GedsUpdateModalView from "./GedsUpdateModalView";

const GedsUpdateModal = ({ visibility }) => {
  return <GedsUpdateModalView visibility={visibility} />;
};

GedsUpdateModal.propTypes = {
  visibility: PropTypes.bool.isRequired,
};

export default GedsUpdateModal;
