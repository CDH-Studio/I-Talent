import React from "react";
import PropTypes from "prop-types";
import { Layout, PageHeader } from "antd";
import { injectIntl } from "react-intl";
import AppLayout from "../layouts/appLayout/AppLayout";
import ResultsCard from "../resultsCard/ResultsCard";
import SearchFilter from "../searchFilter/SearchFilter";

function ResultLayoutView({ changeLanguage, intl, history }) {
  const resultsTitle = intl.formatMessage({
    id: "results.title",
    defaultMessage: "Results",
  });
  return (
    <Layout>
      <AppLayout
        changeLanguage={changeLanguage}
        displaySideBar
        sideBarContent={
          <SearchFilter changeLanguage={changeLanguage} history={history} />
        }
      >
        <PageHeader title={resultsTitle} />
        <ResultsCard changeLanguage={changeLanguage} history={history} />
      </AppLayout>
    </Layout>
  );
}

ResultLayoutView.propTypes = {
  changeLanguage: PropTypes.func.isRequired,
  history: PropTypes.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }).isRequired,
};

export default injectIntl(ResultLayoutView);
