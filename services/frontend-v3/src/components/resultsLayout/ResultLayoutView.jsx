import React, { Component } from "react";
import AppLayout from "../layouts/appLayout/AppLayout";
import { Layout } from "antd";
import { Form, PageHeader } from "antd";
import { injectIntl } from "react-intl";
import ResultsCard from "../resultsCard/ResultsCard";

class ResultLayoutView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false
    };
  }

  render() {
    const resultsTitle = this.props.intl.formatMessage({
      id: "results.title",
      defaultMessage: "Results"
    });
    return (
      <Layout>
        <AppLayout
          changeLanguage={this.props.changeLanguage}
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
