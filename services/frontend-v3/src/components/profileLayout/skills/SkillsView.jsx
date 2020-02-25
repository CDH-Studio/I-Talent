import React, { Component } from "react";

import { Typography } from "antd";
const { Paragraph } = Typography;

class SkillsView extends Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        <Paragraph>{JSON.stringify(data)}</Paragraph>
      </div>
    );
  }
}

export default SkillsView;
