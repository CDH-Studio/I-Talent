import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { Row, Col, Tag, Card, Divider, Avatar, Typography, Empty } from "antd";
import { HistoryPropType, ProfileInfoPropType } from "../../customPropTypes";
import ProfileSkeleton from "../profileSkeleton/ProfileSkeleton";
import prepareInfo from "../../functions/prepareInfo";

const { Meta } = Card;
const { Text } = Typography;

const ResultsCardView = ({ history, results, locale }) => {
  const styles = {
    smallP: {
      lineHeight: "4px",
      zIndex: "-1",
      marginTop: "10px",
    },
  };

  /*
   * Handle Key Press
   *
   * handle how to process when enter key is hit when focusing on a results card
   */

  const handleKeyPress = (e, person) => {
    if (e.charCode === 32 || e.charCode === 13) {
      e.preventDefault();
      history.push(`/secured/profile/${person.id}`);
    }
  };

  const renderCard = (person, key) => {
    return (
      <Col span={6} style={{ height: "100%" }} key={key}>
        <Card
          tabIndex="0"
          style={{ height: "100%", overflowX: "hidden" }}
          size="small"
          hoverable
          bordered
          onClick={() => history.push(`/secured/profile/${person.id}`)}
          onKeyPress={(e) => handleKeyPress(e, person)}
        >
          <Meta
            avatar={
              <Avatar
                size={48}
                style={{
                  backgroundColor: person.avatarColor,
                }}
              >
                <Text style={{ fontSize: "25px", color: "white" }}>
                  {person.nameInitials}
                </Text>
              </Avatar>
            }
            title={`${person.firstName} ${person.lastName}`}
            description={<p style={styles.smallP}>{person.jobTitle}</p>}
          />

          <p style={styles.smallP}>{person.branch}</p>
          {person.classification &&
          person.classification.description !== null ? (
            <p style={styles.smallP}>
              {`Classification: ${person.classification.description}`}
            </p>
          ) : (
            <p />
          )}

          <Divider
            className="results-card-divider"
            style={styles.divider}
            orientation="left"
          >
            <FormattedMessage id="advanced.search.form.skills" />
          </Divider>

          {person.resultSkills.map((skill) => (
            <Tag
              color="#004441"
              style={{ marginBottom: "2px", marginTop: "2px" }}
            >
              {skill}
            </Tag>
          ))}
        </Card>
      </Col>
    );
  };

  const renderResultCards = (dataSource) => {
    if (!dataSource) {
      return <ProfileSkeleton />;
    }
    if (dataSource instanceof Error) {
      return `An error was encountered! Please try again.\n\n${String(
        dataSource
      )}`;
    }

    if (dataSource.length === 0) {
      return (
        <Empty description={<FormattedMessage id="search.no.results" />} />
      );
    }

    const preparedResults = prepareInfo(dataSource, locale);

    return preparedResults.map((person, key) => renderCard(person, key));
  };

  return (
    <div>
      <Row
        gutter={[16, 16]}
        type="flex"
        justify="left"
        align={results.length === 0 ? "center" : "top"}
      >
        {renderResultCards(results)}
      </Row>
    </div>
  );
};

ResultsCardView.propTypes = {
  history: HistoryPropType.isRequired,
  results: PropTypes.arrayOf(ProfileInfoPropType),
  locale: PropTypes.oneOf(["fr", "en"]).isRequired,
};

ResultsCardView.defaultProps = {
  results: null,
};

export default ResultsCardView;
