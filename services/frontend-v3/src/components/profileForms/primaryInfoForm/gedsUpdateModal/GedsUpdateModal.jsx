import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import GedsUpdateModalView from "./GedsUpdateModalView";

const GedsUpdateModal = ({ visibility, profile }) => {
  return <GedsUpdateModalView visibility={visibility} profile={profile} />;
};

GedsUpdateModal.propTypes = {
  formType: PropTypes.bool.isRequired,
};

export default GedsUpdateModal;
