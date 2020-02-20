import React, { Component, useState } from "react";
import { Button } from "antd";
import ErrorResultView from "./errorResultView";
import { Redirect } from "react-router-dom";

class ErrorResult extends Component {
  state = { back: false };

  handleClick = () => {
    this.setState({ back: true });
  };

  propMap = {
    404: {
      status: "404",
      title: "404",
      subTitle: "Looks like someone is in the wrong place",
      extra: (
        <Button onClick={() => this.handleClick()} type="primary">
          Back to Home
        </Button>
      )
    }
  };

  render() {
    if (this.state.back) {
      return <Redirect to="/" />;
    }
    return <ErrorResultView props={this.propMap[this.props.errorCode]} />;
  }
}

export default ErrorResult;
