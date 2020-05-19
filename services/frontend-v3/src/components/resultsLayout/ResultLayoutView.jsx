import React from "react";
import PropTypes from "prop-types";
import { Layout, PageHeader } from "antd";
import { injectIntl } from "react-intl";
import AppLayout from "../layouts/appLayout/AppLayout";
import ResultsCard from "../resultsCard/ResultsCard";
import SearchFilter from "../searchFilter/SearchFilter";
import { HistoryPropType } from "../../customPropTypes";

const ResultLayoutView = ({ intl, history }) => {
  const resultsTitle = intl.formatMessage({
    id: "results.title",
    defaultMessage: "Results",
  });
  return (
    <Layout>
      <AppLayout
        displaySideBar
        sideBarContent={<SearchFilter history={history} />}
      >
        <PageHeader title={resultsTitle} />
        <ResultsCard history={history} />
      </AppLayout>
    </Layout>
  );
};

ResultLayoutView.propTypes = {
  history: HistoryPropType.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }).isRequired,
};

export default injectIntl(ResultLayoutView);
