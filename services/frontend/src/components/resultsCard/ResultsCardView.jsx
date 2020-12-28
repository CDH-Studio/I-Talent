import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { Row, Col, Card, Empty, Skeleton, Spin, Result } from "antd";
import { ProfileInfoPropType } from "../../utils/customPropTypes";
import Header from "../header/Header";
import prepareInfo from "../../functions/prepareInfo";
import EmptyImage from "./online_team_meeting_.svg";
import ResultsProfileCard from "./resultProfileCard/ResultProfileCard";
import "./ResultsCardView.less";

const ResultsCardView = ({
  results,
  locale,
  emptyQuery,
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
        <>
          <FormattedMessage id="search.results.found" />: {count}
        </>
      );
    }
    return <Spin className="res-loading-spinner" />;
  };

  /**
   * Render Result Cards
   * @param {Object} dataSource - The list of user results.
   */
  const renderResultCards = (dataSource) => {
    if (emptyQuery) {
      return (
        <Result
          icon={<img src={EmptyImage} height={200} alt="Empty results page" />}
          title={<FormattedMessage id="search.empty.query.title" />}
          subTitle={<FormattedMessage id="search.empty.query.subtitle" />}
        />
      );
    }

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
        title={<FormattedMessage id="results.title" />}
        subtitle={getResultCount({ isLoading: loading, count: results.length })}
        onBack={() => {
          window.history.back();
        }}
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
  emptyQuery: PropTypes.bool.isRequired,
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
