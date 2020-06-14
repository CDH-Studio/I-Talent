import React from "react";
import PropTypes from "prop-types";
import { Layout, PageHeader } from "antd";
import { injectIntl } from "react-intl";
import AppLayout from "../appLayout/AppLayout";
import ResultsCard from "../../resultsCard/ResultsCard";
import SearchFilter from "../../searchFilter/SearchFilter";

const ResultLayoutView = ({ intl }) => {
  const resultsTitle = intl.formatMessage({
    id: "results.title",
    defaultMessage: "Results",
  });
  return (
    <Layout>
      <AppLayout displaySideBar sideBarContent={<SearchFilter />}>
        <PageHeader title={resultsTitle} />
        <ResultsCard />
      </AppLayout>
    </Layout>
  );
};

ResultLayoutView.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }).isRequired,
};

export default injectIntl(ResultLayoutView);
