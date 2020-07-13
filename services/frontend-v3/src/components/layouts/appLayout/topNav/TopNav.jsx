import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import TopNavView from "./TopNavView";

const TopNav = ({ loading }) => {
  const { isAdmin } = useSelector((state) => state.user);

  return <TopNavView isAdmin={isAdmin} loading={loading} />;
};

TopNav.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default TopNav;
