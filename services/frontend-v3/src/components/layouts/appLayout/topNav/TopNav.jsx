import React from "react";
import { useSelector } from "react-redux";
import TopNavView from "./TopNavView";

const TopNav = () => {
  const { isAdmin } = useSelector((state) => state.user);

  return <TopNavView isAdmin={isAdmin}/>;
};

export default TopNav;
