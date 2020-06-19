import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import DoneSetupView from "./DoneSetupView";
import config from "../../../config";
import handleError from "../../../functions/handleError";

const { backendAddress } = config;

/**
 *  DoneSetup(props)
 *
 *  Controller for the Done Setup Page.
 */
const DoneSetup = () => {
  const { id } = useSelector((state) => state.user);

  return <DoneSetupView userId={id} />;
};

export default DoneSetup;
