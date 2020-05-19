import React from "react";
import SearchBarErrorView from "./SearchBarErrorView";
import { NetworkErrorsPropType } from "../../../customPropTypes";

const SearchBarError = ({ networkErrors }) => {
  return <SearchBarErrorView networkErrors={networkErrors} />;
};

SearchBarError.propTypes = {
  networkErrors: NetworkErrorsPropType.isRequired,
};

export default SearchBarError;
