import React, { useEffect } from "react";
import { Row } from "antd";
import { FormattedMessage } from "react-intl";
import SearchBar from "../components/searchBar/SearchBar";
import AppLayout from "../components/layouts/appLayout/AppLayout";

const Home = () => {
  useEffect(() => {
    document.title = "Home | I-Talent";
  }, []);

  return (
    <AppLayout displaySideBar={false}>
      <h1 className="hidden">
        <FormattedMessage id="home" />
      </h1>
      <Row>
        <SearchBar />
      </Row>
    </AppLayout>
  );
};

export default Home;
