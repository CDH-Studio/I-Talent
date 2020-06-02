import React from "react";
import ErrorResult from "../components/errorResult/errorResult";

const NotFound = () => {
  return (
    <ErrorResult errorCode={404}>
      <h1 className="hidden">Error Page - Code 400</h1>
    </ErrorResult>
  );
};

export default NotFound;
