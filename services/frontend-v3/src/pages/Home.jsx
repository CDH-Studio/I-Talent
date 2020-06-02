import React, { useEffect } from "react";
import { Row } from "antd";
import { FormattedMessage } from "react-intl";
import SearchBar from "../components/searchBar/SearchBar";
import AppLayout from "../components/layouts/appLayout/AppLayout";
import { HistoryPropType } from "../customPropTypes";

const Home = ({ history }) => {
  useEffect(() => {
    document.title = "Home | I-Talent";
  }, []);

  return (
    <AppLayout displaySideBar={false}>
      <h1 className="hidden">
        <FormattedMessage id="home" />
      </h1>
      <Row>
        <SearchBar history={history} />
      </Row>
    </AppLayout>
  );
};

Home.propTypes = {
  history: HistoryPropType.isRequired,
};

export default Home;
