import React, { Component } from "react";
import AppLayout from "../layouts/appLayout/AppLayout";
import { Layout, Card } from "antd";
import { Form, PageHeader } from "antd";
import axios from "axios";
import {} from "antd";
import config from "../../config";
import { injectIntl } from "react-intl";
import ResultsCard from "../resultsCard/ResultsCard";

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
    const resultsTitle = this.props.intl.formatMessage({
      id: "results.title",
      defaultMessage: "Results"
    });
    return (
      <Layout>
        <AppLayout
          displaySideBar={true}
          //sideBarContent={}
        >
          <PageHeader title={resultsTitle} />
          <ResultsCard
            changeLanguage={this.props.changeLanguage}
            history={this.props.history}
          />
        </AppLayout>
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
