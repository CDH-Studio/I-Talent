import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Row } from "antd";
import SearchBar from "../components/searchBar/SearchBar";
import AppLayout from "../components/layouts/appLayout/AppLayout";

const Home = ({ changeLanguage, history }) => {
  useEffect(() => {
    document.title = "Home | I-Talent";
  }, []);

  return (
    <AppLayout changeLanguage={changeLanguage} displaySideBar={false}>
      <Row>
        <SearchBar history={history} />
      </Row>
    </AppLayout>
  );
};

Home.propTypes = {
  changeLanguage: PropTypes.func.isRequired,
  history: PropTypes.isRequired,
};

export default Home;
