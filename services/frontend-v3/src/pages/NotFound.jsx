import React, { Component } from "react";
import ErrorResult from "../components/errorResult/errorResult";

class NotFound extends Component {
  render() {
    return <ErrorResult errorCode={404} history={this.props.history} />;
  }
}

export default NotFound;
