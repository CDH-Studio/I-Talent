import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, Grid, Image, Label, Loader } from "semantic-ui-react";

import tempProfilePicture from "../../assets/tempProfilePicture.png";
import "./resultStyles.css";
import NavigationBar from "../navigationBar/navigationBarController";
import prepareInfo from "../../functions/prepareInfo";

/** UI for the /results route layout */
export default class ResultsLayoutView extends Component {
  static propTypes = {
    /** Function used to change the language intl-react is using */
    changeLanguage: PropTypes.func.isRequired,
    /** React-Intl's translation object */
    intl: PropTypes.object.isRequired,
    /** Object representing Keycloak autherization */
    keycloak: PropTypes.object,
    /** Function to change route */
    redirectFunction: PropTypes.func.isRequired,
    /** Array of information on people who showed up on search query */
    results: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.renderResultCards = this.renderResultCards.bind(this);
  }

  render() {
    const { changeLanguage, keycloak, redirectFunction } = this.props;
    return (
      <div>
        <NavigationBar
          changeLanguage={changeLanguage}
          includeSearchForm
          keycloak={keycloak}
          redirectFunction={redirectFunction}
        />

        <div className="resultContent">
          <Grid>
            <Grid.Row>{this.renderResultCards()}</Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }

  /**
   * returns a group of cards with information about people who are results for the search query or an alternative element
   */
  renderResultCards() {
    const { results } = this.props;

    if (!results) {
      return <Loader />;
    }
    if (results instanceof Error) {
      return (
        "An error was encountered! Please try again.\n\n" + String(results)
      );
    }

    const preparedResults = prepareInfo(
      results,
      localStorage.getItem("lang") || "en"
    );
    let cards = [];
    preparedResults.forEach((person) => {
      cards.push(this.renderCard(person));
    });
    return <Card.Group fluid>{cards}</Card.Group>;
  }

  /**
   * Return Card element with information about a person
   * @param {PropTypes.object} person
   */
  renderCard(person) {
    const { redirectFunction } = this.props;

    return (
      <Card onClick={() => redirectFunction("/secured/profile/" + person.id)}>
        <Card.Content>
          <Image floated="right" size="mini" src={tempProfilePicture} />
          <Card.Header>{person.firstName + " " + person.lastName}</Card.Header>
          <Card.Meta>{person.jobTitle}</Card.Meta>
          <Card.Meta>{person.branch}</Card.Meta>
        </Card.Content>
        <Card.Content>
          {person.resultSkills.map((skill) => (
            <Label
              style={{ marginBottom: "2px", marginTop: "2px" }}
              color="blue"
            >
              {skill}
            </Label>
          ))}
        </Card.Content>
      </Card>
    );
  }
}
