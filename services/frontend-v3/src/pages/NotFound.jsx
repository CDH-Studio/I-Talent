import React, { Component } from "react";
import ErrorResult from "../components/errorResult/errorResult";

class NotFound extends Component {
  render() {
    return <ErrorResult errorCode={404} />;
  }
}

export default NotFound;
