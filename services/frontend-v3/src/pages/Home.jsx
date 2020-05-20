import React, { useEffect } from "react";
import { Row } from "antd";
import SearchBar from "../components/searchBar/SearchBar";
import AppLayout from "../components/layouts/appLayout/AppLayout";
import { HistoryPropType } from "../customPropTypes";

const Home = ({ history }) => {
  useEffect(() => {
    document.title = "Home | I-Talent";
  }, []);

  return (
    <AppLayout displaySideBar={false}>
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
