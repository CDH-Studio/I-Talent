import React from "react";
import ErrorResult from "../components/errorResult/errorResult";

const Forbidden = () => {
  return <ErrorResult errorCode={403} />;
};

export default Forbidden;
