import React, { Component } from "react";
import { Input, Form } from "antd";

export default class TextField extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.rules);

    return (
      <div key={this.props.defaultValue}>
        <Form.Item
          name={this.props.name}
          label={this.props.label}
          rules={this.props.rules}
        >
          <Input defaultValue={this.props.defaultValue || ""} />
        </Form.Item>
      </div>
    );
  }
}

/* Component Styles */
const styles = {
  content: {
    textAlign: "center",
    width: "100%",
    minHeight: "400px",
    background: "#fff",
    padding: "100px 10px"
  },
  subHeading: {
    fontSize: "1.3em"
  }
};
