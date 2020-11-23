import { useEffect } from "react";
import { Row } from "antd";
import { FormattedMessage, useIntl } from "react-intl";
import SearchBar from "../components/searchBar/SearchBar";
import AppLayout from "../components/layouts/appLayout/AppLayout";

const Home = () => {
  const intl = useIntl();

  useEffect(() => {
    document.title = `${intl.formatMessage({ id: "home" })} | I-Talent`;
  }, [intl]);

  return (
    <AppLayout displaySideBar={false} displayLogo={false} displaySearch={false}>
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
