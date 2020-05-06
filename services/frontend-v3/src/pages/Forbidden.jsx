import React, { Component } from "react";
import ErrorResult from "../components/errorResult/errorResult";

class Forbidden extends Component {
  render() {
    return <ErrorResult errorCode={403} />;
  }
}

export default Forbidden;
