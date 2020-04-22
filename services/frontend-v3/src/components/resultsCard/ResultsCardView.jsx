import React from "react";
import { injectIntl } from "react-intl";
import { Row, Col, Tag, Card, Divider } from "antd";
import ProfileSkeleton from "../profileSkeleton/ProfileSkeleton";
import prepareInfo from "../../functions/prepareInfo";
const { Meta } = Card;

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
    } else if (dataSource instanceof Error) {
      return (
        "An error was encountered! Please try again.\n\n" + String(dataSource)
      );
    } else {
      const preparedResults = prepareInfo(
        dataSource,
        localStorage.getItem("lang")
      );
      let cards = [];
      preparedResults.forEach((person) => {
        cards.push(renderCard(person));
      });
      return cards;
    }
  };

  const renderCard = (person) => {
    return (
      <Col span={6} style={{ height: "100%" }}>
        <Card
          style={{ height: "100%", overflowX: "hidden" }}
          size="small"
          hoverable
          bordered={true}
          onClick={() => props.history.push("/secured/profile/" + person.id)}
        >
          <Meta
            title={person.firstName + " " + person.lastName}
            description={<p style={styles.smallP}>{person.jobTitle}</p>}
          ></Meta>

          <p style={styles.smallP}>{person.branch}</p>
          {person.classification.description !== null ? (
            <p style={styles.smallP}>
              {"Classification: " + person.classification.description}
            </p>
          ) : (
            <p></p>
          )}

          <Divider style={styles.divider} orientation="left">
            {props.intl.formatMessage({
              id: "advanced.search.form.skills",
              defaultMessage: "Skills",
            })}
          </Divider>
          {person.resultSkills.map((skill) => (
            <Tag
              style={{ overflowX: "hidden" }}
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
