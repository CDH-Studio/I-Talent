import React, { Component } from "react";
import { Result } from "antd";

class ErrorResultView extends Component {
  render() {
    return <Result {...this.props.props} />;
  }
}

export default ErrorResultView;
