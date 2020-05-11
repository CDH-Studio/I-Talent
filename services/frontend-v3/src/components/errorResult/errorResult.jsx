import React, { Component } from "react";
import { Button } from "antd";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import ErrorResultView from "./errorResultView";

class ErrorResult extends Component {
  constructor(props) {
    super(props);
    this.state = { back: false };

    this.handleClick = this.handleClick.bind(this);

    this.propMap = {
      404: {
        status: "404",
        title: "404",
        subTitle: "Looks like someone is in the wrong place",
        extra: (
          <Button onClick={() => this.handleClick()} type="primary">
            Back to Home
          </Button>
        ),
      },
      403: {
        status: "403",
        title: "403",
        subTitle: "Looks like someone doesn't belong",
        extra: (
          <Button onClick={() => this.handleClick()} type="primary">
            Back to Home
          </Button>
        ),
      },
    };
  }

  handleClick() {
    this.setState({ back: true });
  }

  render() {
    const { back } = this.state;
    const { errorCode } = this.props;
    if (back) {
      return <Redirect to="/" />;
    }
    return <ErrorResultView resultProps={this.propMap[errorCode]} />;
  }
}
ErrorResult.propTypes = {
  errorCode: PropTypes.number.isRequired,
};

export default ErrorResult;
