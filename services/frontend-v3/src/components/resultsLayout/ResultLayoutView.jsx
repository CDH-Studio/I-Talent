import React from "react";
import AppLayout from "../layouts/appLayout/AppLayout";
import "@ant-design/compatible/assets/index.css";
import { Layout, PageHeader } from "antd";

import { injectIntl } from "react-intl";
import ResultsCard from "../resultsCard/ResultsCard";
import SearchFilter from "../searchFilter/SearchFilter";

function ResultLayoutView(props) {
  const resultsTitle = props.intl.formatMessage({
    id: "results.title",
    defaultMessage: "Results",
  });
  return (
    <Layout>
      <AppLayout
        changeLanguage={props.changeLanguage}
        displaySideBar
        sideBarContent={
          <SearchFilter
            changeLanguage={props.changeLanguage}
            history={props.history}
          />
        }
      >
        <PageHeader title={resultsTitle} />
        <ResultsCard
          changeLanguage={props.changeLanguage}
          history={props.history}
        />
      </AppLayout>
    </Layout>
  );
}

export default injectIntl(ResultLayoutView);
