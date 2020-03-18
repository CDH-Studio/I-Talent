import React, { useState } from "react";
import AppLayout from "../layouts/appLayout/AppLayout";
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import { Layout } from "antd";
import { PageHeader } from "antd";
import { injectIntl } from "react-intl";
import ResultsCard from "../resultsCard/ResultsCard";
import SearchFilter from "../searchFilter/SearchFilter";

function ResultLayoutView(props) {
  const [collapsed, setCollapsed] = useState(false);

  const resultsTitle = props.intl.formatMessage({
    id: "results.title",
    defaultMessage: "Results"
  });
  return (
    <Layout>
      <AppLayout
        changeLanguage={props.changeLanguage}
        displaySideBar={true}
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

//ResultLayoutView = Form.create({})(ResultLayoutView);
export default injectIntl(ResultLayoutView);
