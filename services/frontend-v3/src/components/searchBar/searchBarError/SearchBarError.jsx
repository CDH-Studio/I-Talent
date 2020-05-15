import React from "react";
import SearchBarErrorView from "./SearchBarErrorView";

const SearchBarError = ({ networkError }) => {
  return <SearchBarErrorView networkError={networkError} />;
};

export default SearchBarError;
