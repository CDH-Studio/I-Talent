import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { Row, Col, Card, Typography, Empty, Skeleton, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ProfileInfoPropType } from "../../utils/customPropTypes";
import Header from "../header/Header";
import prepareInfo from "../../functions/prepareInfo";
import ResultsProfileCard from "./resultProfileCard/ResultProfileCard";
import "./ResultsCardView.less";

const { Text } = Typography;

const ResultsCardView = ({
  results,
  locale,
  loading,
  loggedInUserId,
  connections,
  addConnection,
  removeConnection,
}) => {
  /**
   * Render Result Count
   * @param {Boolean} isLoading - loading status.
   * @param {number} count - loading status.
   */
  const getResultCount = ({ isLoading, count }) => {
    if (!isLoading) {
      return (
        <Text type="secondary" className="res-result-count">
          <FormattedMessage id="search.results.found" />: {count}
        </Text>
      );
    }
    return <Spin className="res-loading-spinner" />;
  };

  /**
   * Render Result Cards
   * @param {Object} dataSource - The list of user results.
   */
  const renderResultCards = (dataSource) => {
    if (!loading && dataSource.length === 0) {
      return (
        <Empty description={<FormattedMessage id="search.no.results" />} />
      );
    }

    const preparedResults = prepareInfo(dataSource, locale);

    return preparedResults.map((person) => {
      const isConnection = connections.includes(person.id);
      return (
        <ResultsProfileCard
          profile={person}
          key={person.id}
          isConnection={isConnection}
          loggedInUserId={loggedInUserId}
          addConnection={addConnection}
          removeConnection={removeConnection}
        />
      );
    });
  };

  /**
   * Get loading animations when loading results
   *
   */
  const getLoadingAnimation = () => {
    return (
      <Row gutter={[16, 16]} type="flex" justify="left">
        <Col span={24} xxl={12}>
          <Card>
            <Skeleton active />
          </Card>
        </Col>
        <Col span={24} xxl={12} style={{ opacity: "50%" }}>
          <Card>
            <Skeleton active />
          </Card>
        </Col>
        <Col span={24} xxl={12} style={{ opacity: "30%" }}>
          <Card>
            <Skeleton active />
          </Card>
        </Col>
      </Row>
    );
  };

  return (
    <>
      <Header
        title={
          <>
            <SearchOutlined />
            <FormattedMessage id="results.title" />
          </>
        }
        subtitle={getResultCount({ isLoading: loading, count: results.length })}
      />
      <div className="res-container">
        {loading && getLoadingAnimation()}
        <Row
          gutter={[16, 16]}
          type="flex"
          justify="left"
          align={results.length === 0 ? "center" : undefined}
        >
          {!loading && renderResultCards(results)}
        </Row>
      </div>
    </>
  );
};

ResultsCardView.propTypes = {
  results: PropTypes.arrayOf(ProfileInfoPropType),
  locale: PropTypes.oneOf(["FRENCH", "ENGLISH"]).isRequired,
  loading: PropTypes.bool.isRequired,
  loggedInUserId: PropTypes.string.isRequired,
  connections: PropTypes.arrayOf(PropTypes.string).isRequired,
  addConnection: PropTypes.func.isRequired,
  removeConnection: PropTypes.func.isRequired,
};

ResultsCardView.defaultProps = {
  results: [],
};

export default ResultsCardView;
