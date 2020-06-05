import React from "react";
import PropTypes from "prop-types";
import { Layout, PageHeader } from "antd";
import { FormattedMessage, injectIntl } from "react-intl";
import AppLayout from "../appLayout/AppLayout";
import ResultsCard from "../../resultsCard/ResultsCard";
import SearchFilter from "../../searchFilter/SearchFilter";
import { HistoryPropType } from "../../../customPropTypes";

const ResultLayoutView = ({ history }) => {
  return (
    <Layout>
      <AppLayout
        displaySideBar
        sideBarContent={<SearchFilter history={history} />}
      >
        <h1 className="hidden">
          <FormattedMessage id="results.title" />
        </h1>
        <PageHeader title={<FormattedMessage id="results.title" />} />
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
