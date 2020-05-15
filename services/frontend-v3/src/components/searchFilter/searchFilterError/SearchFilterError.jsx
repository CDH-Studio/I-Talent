import React from "react";
import SearchFilterErrorView from "./SearchFilterErrorView";

const SearchFilterError = ({ networkError }) => {
  return <SearchFilterErrorView networkError={networkError} />;
};

export default SearchFilterError;
