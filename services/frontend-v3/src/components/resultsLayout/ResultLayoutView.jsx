import React, { Component } from "react";
import AppLayoutView from "../layouts/appLayout/AppLayoutView";
import { Layout } from "antd";
import { Form, Col, Input, Switch, Select } from "antd";
import axios from "axios";
import {} from "antd";
import config from "../../config";
import { injectIntl } from "react-intl";

const backendAddress = config.backendAddress;

class ResultLayoutView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false
    };
  }

  render() {
    const { data } = this.props;
    return (
      <Layout>
        <AppLayoutView
          displaySideBar={true}
          //sideBarContent={}
        ></AppLayoutView>
      </Layout>
    );
  }
}

ResultLayoutView = Form.create({})(ResultLayoutView);
export default injectIntl(ResultLayoutView);

/* Component Styles */
const styles = {
  content: {
    background: "#fff",
    padding: 24,
    margin: 0,
    minHeight: 280
  }
};
