import React from "react";
import { injectIntl } from "react-intl";
import { Row, Col, Tag, Card, Divider, Alert } from "antd";
import ProfileSkeleton from "../profileSkeleton/ProfileSkeleton";
import prepareInfo from "../../functions/prepareInfo";
const { Meta } = Card;
class ResultsCardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isEmpty: false };
  }

  renderResultCards() {
    const { results } = this.props;

    if (!results) {
      return <ProfileSkeleton />;
    }

    const preparedResults = prepareInfo(results, localStorage.getItem("lang"));
    let cards = [];
    preparedResults.forEach(person => {
      cards.push(this.renderCard(person));
    });
    cards.length === 0
      ? this.setState({ isEmpty: true })
      : console.log("not empty");
    return cards;
  }

  handleKeyPress = (e, person) => {
    if (e.charCode === 32 || e.charCode === 13) {
      // Prevent the default action to stop scrolling when space is pressed
      e.preventDefault();
      this.props.history.push("/secured/profile/" + person.id);
    }
  };

  renderCard(person) {
    return (
      <Col span={6} style={{ height: "100%" }}>
        <Card
          tabIndex="0"
          style={{ height: "100%" }}
          size="small"
          hoverable
          bordered={true}
          onClick={() =>
            this.props.history.push("/secured/profile/" + person.id)
          }
        >
          <a href="javascript:void(0)" tabIndex="0">
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
          </a>
        </Card>
      </Col>
    );
  }
  render() {
    return (
      <div>
        <Row gutter={[16, 16]} type="flex" justify="left" align="top">
          {/* {this.renderResultCards()} */}
          {this.state.isEmpty === false ? (
            this.renderResultCards()
          ) : (
            <Alert
              style={styles.emptyAlert}
              type="warning"
              message={this.props.intl.formatMessage({
                id: "results.no.results",
                defaultMessage:
                  "There are no results that match your search criteria"
              })}
            />
            // this.renderResultCards()
          )}
        </Row>
      </div>
    );
  }
}

const styles = {
  smallP: {
    lineHeight: "4px",
    zIndex: "-1",
    marginTop: "10px"
  },
  emptyAlert: {
    marginLeft: "20px",
    textAlign: "center"
  }
};

export default injectIntl(ResultsCardView);
