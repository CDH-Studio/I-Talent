import React from "react";
import { Layout, PageHeader } from "antd";
import { FormattedMessage } from "react-intl";
import AppLayout from "../appLayout/AppLayout";
import ResultsCard from "../../resultsCard/ResultsCard";
import SearchFilter from "../../searchFilter/SearchFilter";

const ResultLayoutView = () => (
  <Layout>
    <AppLayout displaySideBar sideBarContent={<SearchFilter />}>
      <PageHeader title={<FormattedMessage id="results.title" />} />
      <ResultsCard />
    </AppLayout>
  </Layout>
);

export default ResultLayoutView;
