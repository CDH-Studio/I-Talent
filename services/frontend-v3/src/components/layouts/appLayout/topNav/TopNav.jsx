import React, { useEffect, useState } from "react";
import axios from "axios";
import TopNavView from "./TopNavView";
import config from "../../../../config";

const { backendAddress } = config;

const TopNav = () => {
  const [authed, setAuthed] = useState(true);

  useEffect(() => {
    axios.get(`${backendAddress}api/user/check`).catch((error) => {
      console.log("AUTH ERRRO", error);
      setAuthed(false);
    });
  }, []);

  return <TopNavView authed={authed} />;
};

export default TopNav;
