import React from "react";
import { FormattedMessage } from "react-intl";
import AppLayout from "../appLayout/AppLayout";
import ResultsCard from "../../resultsCard/ResultsCard";
import SearchFilter from "../../searchFilter/SearchFilter";
import Header from "../../header/Header";

const ResultLayoutView = () => (
  <AppLayout displaySideBar sideBarContent={<SearchFilter />}>
    <Header title={<FormattedMessage id="results.title" />} />
    <ResultsCard />
  </AppLayout>
);

export default ResultLayoutView;
