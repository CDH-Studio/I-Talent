import React from "react";
import { injectIntl } from "react-intl";
import { Row, Col, Tag, Card, Divider, Avatar, Typography } from "antd";
import ProfileSkeleton from "../profileSkeleton/ProfileSkeleton";
import prepareInfo from "../../functions/prepareInfo";

const { Meta } = Card;
const { Text } = Typography;

function ResultsCardView(props) {
  const styles = {
    smallP: {
      lineHeight: "4px",
      zIndex: "-1",
      marginTop: "10px",
    },
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
    const preparedResults = prepareInfo(
      dataSource,
      localStorage.getItem("lang") || "en"
    );
    const cards = [];
    preparedResults.forEach((person) => {
      cards.push(renderCard(person));
    });
    return cards;
  };

  const renderCard = (person) => {
    return (
      <Col span={6} style={{ height: "100%" }}>
        <Card
          style={{ height: "100%", overflowX: "hidden" }}
          size="small"
          hoverable
          bordered
          onClick={() => props.history.push(`/secured/profile/${person.id}`)}
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
          {person.classification.description !== null ? (
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
            {props.intl.formatMessage({
              id: "advanced.search.form.skills",
              defaultMessage: "Skills",
            })}
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

  return (
    <div>
      <Row gutter={[16, 16]} type="flex" justify="left" align="top">
        {renderResultCards(props.results)}
      </Row>
    </div>
  );
}

export default injectIntl(ResultsCardView);
