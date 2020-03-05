import React from "react";
import { injectIntl } from "react-intl";
import { Row, Col, Tag, Card, Divider } from "antd";
import ProfileSkeleton from "../profileSkeleton/ProfileSkeleton";
import prepareInfo from "../../functions/prepareInfo";
const { Meta } = Card;
class ResultsCardView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Row gutter={[16, 16]} type="flex" justify="left" align="top">
          {this.renderResultCards()}
        </Row>
      </div>
    );
  }

  renderResultCards() {
    const { results } = this.props;

    if (!results) {
      return <ProfileSkeleton />;
    }
    if (results instanceof Error) {
      return (
        "An error was encountered! Please try again.\n\n" + String(results)
      );
    }

    const preparedResults = prepareInfo(results, localStorage.getItem("lang"));
    let cards = [];
    preparedResults.forEach(person => {
      cards.push(this.renderCard(person));
    });
    return cards;
  }

  renderCard(person) {
    return (
      <Col span={6} style={{ height: "100%" }}>
        <Card
          style={{ height: "100%" }}
          size="small"
          hoverable
          bordered={true}
          onClick={() =>
            this.props.history.push("/secured/profile/" + person.id)
          }
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
            {this.props.intl.formatMessage({
              id: "advanced.search.form.skills",
              defaultMessage: "Skills"
            })}
          </Divider>
          {person.resultSkills.map(skill => (
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
  }
}

const styles = {
  card: {
    //paddingBottom: "15px"
  },
  smallP: {
    lineHeight: "4px",
    marginTop: "10px"
  }
};

export default injectIntl(ResultsCardView);
