import React from "react";
import { PageHeader } from "antd";
import { FormattedMessage } from "react-intl";
import AppLayout from "../appLayout/AppLayout";
import ResultsCard from "../../resultsCard/ResultsCard";
import SearchFilter from "../../searchFilter/SearchFilter";

const ResultLayoutView = () => (
  <AppLayout displaySideBar sideBarContent={<SearchFilter />}>
    <PageHeader
      style={{ padding: "0 0 15px 7px" }}
      title={
        <span style={{ color: "#192e2f" }}>
          <FormattedMessage id="results.title" />
        </span>
      }
    />
    <ResultsCard />
  </AppLayout>
);

export default ResultLayoutView;
