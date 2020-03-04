import React from "react";
import { injectIntl } from "react-intl";
import { Form, Row, Select, Col, Button, Icon, Card } from "antd";
import ProfileSkeleton from "../profileSkeleton/ProfileSkeleton";
import prepareInfo from "../../functions/prepareInfo";

class ResultsCardView extends React.Component {
  constructor(props) {
    super(props);
    //this.renderResultCards = this.renderResultCards.bind(this);
  }

  render() {
    return (
      <div>
        <Row gutter={16}>
          <Col span={8}>{this.renderResultCards()}</Col>
        </Row>
      </div>
    );
  }

  renderResultCards() {
    const { results } = this.props;

    if (!results) {
      console.log(results);
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
      <div
        onClick={() => this.props.history.push("/secured/profile/" + person.id)}
      >
        <Card hoverable title={person.firstName}></Card>
        {/* <Card hoverable title>{person.firstName + " " + person.lastName}>
          <p>{person.jobTitle}<p>
          <p>{person.branch}<p>
        </Card>
        <Card.Content> */}
        {/* {person.resultSkills.map(skill => (
            <Label
              style={{ marginBottom: "2px", marginTop: "2px" }}
              color="blue"
            >
              {skill}
            </Label>
          ))}
        </div></Card.Content> */}
      </div>
    );
  }
}

export default injectIntl(ResultsCardView);
