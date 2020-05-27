import React, { Component } from "react";
import NavigationBar from "../navigationBar/navigationBarController";
import { FormattedMessage } from "react-intl";
import { Grid, Button, Card, Dimmer, Loader, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

export default class RegisterLayoutView extends Component {
  static propTypes = {
    /** Function to change the language intl-react is using */
    changeLanguage: PropTypes.func.isRequired,
    /** Key value pairs of <field name>:<array of field options> */
    editProfileOptions: PropTypes.objectOf(PropTypes.array).isRequired,
    /** Index of the form currently being displayed */
    formIndex: PropTypes.number.isRequired,
    /** List of possible forms to display */
    formList: PropTypes.arrayOf(PropTypes.element).isRequired,
    /** Index of user in gedsInfoList */
    gedsIndex: PropTypes.number,
    /** List of potential information belonging to user from GEDS */
    gedsInfoList: PropTypes.arrayOf(PropTypes.object),
    /** Function to call when user clicks finish */
    handleRegister: PropTypes.func.isRequired,
    /** react-intl translation object */
    intl: PropTypes.object.isRequired,
    /** Whether this is the last form in the list of forms or not */
    isEarlyRegister: PropTypes.bool,
    /** Keycloak autherization object */
    keycloak: PropTypes.object,
    /** User's keycloak email */
    keycloakEmail: PropTypes.string.isRequired,
    /** The current info that would go in to profile */
    profileInfo: PropTypes.object,
    /** Function to change route */
    redirectFunction: PropTypes.func.isRequired,
    /** adds form changes to the total changes */
    setFormChanges: PropTypes.func.isRequired,
    /** Sets the index of the form being displayed */
    setFormIndex: PropTypes.func.isRequired,
    /** Sets index of user's info in GEDS info */
    setGedsIndex: PropTypes.func.isRequired
  };

  render() {
    const {
      changeLanguage,
      editProfileOptions,
      formIndex,
      formList,
      gedsIndex,
      gedsInfoList,
      handleRegister,
      isEarlyRegister,
      keycloakEmail,
      profileInfo,
      setFormChanges,
      setFormIndex
    } = this.props;

    if (editProfileOptions === null || !gedsInfoList || !keycloakEmail) {
      return (
        <Dimmer active>
          <Grid>
            <Grid.Row>
              <Loader />
            </Grid.Row>

            <Grid.Row>Gathering profile options and geds info...</Grid.Row>
          </Grid>
        </Dimmer>
      );
    }

    const gedsInfo = gedsInfoList[gedsIndex];

    return (
      <React.Fragment>
        {this.renderGedsModal()}
        <NavigationBar
          changeLanguage={changeLanguage}
          logoRedirectHome={true}
        />

        <Grid style={{ maxWidth: "1250px", margin: "0px auto 0px auto" }}>
          <Grid.Column width={4}>{this.renderButtons()}</Grid.Column>
          <Grid.Column width={12}>
            <Card fluid>
              <Card.Header>{formList[formIndex].name}</Card.Header>
              <Card.Content>
                {React.createElement(formList[formIndex].form, {
                  editProfileOptions: editProfileOptions,
                  handleNext: fieldsUpdate => {
                    formList[formIndex].changes = {
                      ...formList[formIndex].changes,
                      ...fieldsUpdate
                    };
                    setFormIndex(formIndex + 1);
                  },
                  handlePrevious:
                    formIndex === 0
                      ? false
                      : fieldsUpdate => {
                          formList[formIndex].changes = {
                            ...formList[formIndex].changes,
                            ...fieldsUpdate
                          };
                          setFormIndex(formIndex - 1);
                        },
                  handleRegister: handleRegister,
                  isEarlyRegister: isEarlyRegister,
                  profileInfo: profileInfo,
                  setFormChanges: setFormChanges,
                  unchangeableInfo: gedsInfo && {
                    email: keycloakEmail,
                    firstName: gedsInfo.firstName,
                    jobTitle: gedsInfo.jobTitle,
                    lastName: gedsInfo.lastName,
                    organizations: gedsInfo.organizations
                  }
                })}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </React.Fragment>
    );
  }

  /** Render modal used to select user's geds info */
  renderGedsModal() {
    const { gedsIndex, gedsInfoList, setGedsIndex } = this.props;
    return (
      <Modal
        closeOnDimmerClick={false}
        closeOnEscape={false}
        open={gedsIndex === null}
      >
        <Modal.Content>
          <h1 style={{ textAlign: "center" }}>
            <FormattedMessage id="setup.select.geds.card" />
          </h1>
          <Card.Group stackable itemsPerRow={3}>
            {gedsInfoList.map((element, index) => {
              return (
                <Card onClick={(e, o) => setGedsIndex(index)}>
                  <Card.Content>
                    <div style={{ fontSize: "18pt", color: "#27348b" }}>
                      {element.firstName + " " + element.lastName}
                    </div>
                    <div
                      style={{
                        fontSize: "16pt",
                        color: "#444444"
                      }}
                    >
                      {element.jobTitle}
                    </div>
                    <div
                      style={{
                        fontSize: "13pt",
                        color: "#000000",
                        paddingBottom: "8pt"
                      }}
                    >
                      {element.organization &&
                        element.organization.length &&
                        element.organization[0].description}
                    </div>
                    <div style={{ fontSize: "13pt", color: "#000000" }}>
                      {element.telephone}
                    </div>
                  </Card.Content>
                </Card>
              );
            })}
          </Card.Group>
        </Modal.Content>
      </Modal>
    );
  }

  /** render buttons for selecting forms  */
  renderButtons() {
    const { formIndex, formList, setFormIndex } = this.props;
    let buttons = [];
    formList.forEach((value, index) =>
      buttons.push(
        <Button
          basic={index !== formIndex}
          color="blue"
          fluid
          onClick={e => setFormIndex(index)}
        >
          {value.name}
        </Button>
      )
    );

    return buttons;
  }
}
