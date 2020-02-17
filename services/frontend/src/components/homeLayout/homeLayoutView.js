import React, { Component } from "react";
import { Grid, Image, Message, Label } from "semantic-ui-react";

import PropTypes from "prop-types";

import logo3 from "../../assets/fullLogo3.svg";
import SearchForm from "../searchForm/searchFormController";
import NavigationBar from "../navigationBar/navigationBarController";

/**
 * UI for the /home route
 * A form for creating a search query
 *
 * PROPS:                   DEFAULT VALUE:          DESCRIPTION:
 * keycloak                 null                    The keycloak instance being used
 * typeButtonText           "Advanced search"       The text to display on the toggle search type button
 * typeButtonURL            "/secured/advanced"     The url of the page the search type button should redirect to
 * redirectFunction         null                    The function to call with the redirectButtonURL
 * showAdvancedFields       False                   Whether or not to show advanced options or just skills
 */
class HomeLayoutView extends Component {
  static propTypes = {
    /** Function used to change the language intl-react is using */
    changeLanguage: PropTypes.func.isRequired,
    /** The object representing the keycloak session */
    keycloak: PropTypes.object,
    /** Function to change route */
    redirectFunction: PropTypes.func.isRequired,
    /** Whether should display advanced search form or not */
    showAdvancedFields: PropTypes.bool
  };

  emptyFieldWarning() {
    if (this.props.isEmpty == true) {
      return (
        <div>
          {/* <Message attached content "To search: input a value into the search bar below. Example entries: John Doe, JavaScript, CIOB"/> */}
          <Label basic color="red" pointing="below">
            To Search: input a value into the search bar below.
          </Label>
        </div>
      );
    }
  }

  render() {
    const {
      changeLanguage,
      keycloak,
      redirectFunction,
      showAdvancedFields,
      setEmpty
    } = this.props;

    return (
      <div role="region">
        <NavigationBar keycloak={keycloak} changeLanguage={changeLanguage} />
        <Grid centered style={styles.grid}>
          <Grid.Row style={styles.row}>
            <Image
              alt="UpSkill Logo"
              size="large"
              src={logo3}
              style={styles.logo}
            />
          </Grid.Row>
          <Grid.Row style={styles.row}>
            <div>{this.emptyFieldWarning()}</div>
          </Grid.Row>
          <Grid.Row>
            <SearchForm
              maxFormWidth="850px"
              redirectFunction={redirectFunction}
              showAdvancedFields={showAdvancedFields}
              toggleButton
              setEmpty={setEmpty}
            />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const styles = {
  button: {
    marginLeft: "30px",
    marginRight: "30px",
    marginTop: "20px",
    width: "170px"
  },

  grid: {
    margin: "0 auto",
    width: "100%"
  },

  logo: {
    paddingLeft: "50px",
    paddingRight: "50px",
    paddingTop: "200px"
  },

  row: {
    padding: "3px",
    width: "100%"
  }
};

export default HomeLayoutView;
