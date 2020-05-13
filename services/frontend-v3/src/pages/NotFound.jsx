import React from "react";
import ErrorResult from "../components/errorResult/errorResult";

const NotFound = () => {
  return <ErrorResult errorCode={404} />;
};

export default NotFound;
