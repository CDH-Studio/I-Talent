import React, { useEffect } from "react";
import { Row } from "antd";
import SearchBar from "../components/searchBar/SearchBar";
import AppLayout from "../components/layouts/appLayout/AppLayout";

const Home = () => {
  useEffect(() => {
    document.title = "Home | I-Talent";
  }, []);

  return (
    <AppLayout displaySideBar={false}>
      <Row>
        <SearchBar />
      </Row>
    </AppLayout>
  );
};

Home.propTypes = {};

export default Home;
