import React from "react";
import { injectIntl } from "react-intl";
import { Form, Row, Select, Col, Button, Icon, Card } from "antd";

class ResultsCardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false
    };
  }

  render() {
    const {} = this.props;
    const { data } = this.props;

    return "helllllooo";
  }
}

export default injectIntl(ResultsCardView);
