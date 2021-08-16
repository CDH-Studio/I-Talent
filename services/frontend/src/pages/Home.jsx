import { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Row } from "antd";

import AppLayout from "../components/layouts/appLayout/AppLayout";
import SearchBar from "../components/searchBar/SearchBar";

const Home = () => {
  const intl = useIntl();

  useEffect(() => {
    document.title = `${intl.formatMessage({ id: "home" })} | I-Talent`;
  }, [intl]);

  return (
    <AppLayout displayLogo={false} displaySearch={false} displaySideBar={false}>
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
