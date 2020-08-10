import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import useAxios from "../../../../utils/axios-instance";
import handleError from "../../../../functions/handleError";

import LinkAttachmentView from "./LinkAttachmentView";

const LinkAttachment = () => {
  return <LinkAttachmentView />;
};
export default LinkAttachment;
