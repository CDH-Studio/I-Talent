import React from "react";
import SearchFilterErrorView from "./SearchFilterErrorView";
import { NetworkErrorsPropType } from "../../../customPropTypes";

const SearchFilterError = ({ networkErrors }) => {
  return <SearchFilterErrorView networkErrors={networkErrors} />;
};

SearchFilterError.propTypes = {
  networkErrors: NetworkErrorsPropType.isRequired,
};

export default SearchFilterError;
