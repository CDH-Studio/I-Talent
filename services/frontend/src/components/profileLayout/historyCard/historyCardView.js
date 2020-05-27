import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { Grid } from "semantic-ui-react";
import moment from "moment";
import PropTypes from "prop-types";

import ProfileCardController from "../profileCard/profileCardController";
import "./historyCard.css";

import { renderValue } from "../../../functions/profileTools"; //"../common/profileTools";
import "../common/common.css";

const SHRUNK_DISPLAYED_ITEM_COUNT = 2; //How many items to show when not expanded

/** UI for displaying the profile card with a user's list of education and the profile card for the card with a user's experience */
class HistoryCardView extends Component {
  static propTypes = {
    /** Key value pairs of <field name>:<backend suburl to get array of options from> */
    editOptionPaths: PropTypes.objectOf(PropTypes.string),
    /** Whether the card is currently showing all items or first SHRUNK_DISPLAYED_ITEM_COUNT */
    expanded: PropTypes.bool,
    /** Array of history items */
    cardEntries: PropTypes.arrayOf(PropTypes.object),
    /** Name displayed on the card */
    cardName: PropTypes.string.isRequired,
    /** The form to display for editing */
    form: PropTypes.func.isRequired,
    /** Name displayed on the form */
    formName: PropTypes.string.isRequired,
    /** The function to call to handle clicking the shrink/expand text of the card */
    handleToggleExpanded: PropTypes.func.isRequired,
    /** React-Intl's translation object */
    intl: PropTypes.object.isRequired
  };

  render() {
    const {
      cardEntries,
      cardName,
      editOptionPaths,
      expanded,
      form,
      formName,
      intl
    } = this.props;
    const bindedRenderValue = renderValue.bind(this, intl);

    let usedEntries;
    if (expanded) {
      usedEntries = cardEntries;
    } else {
      usedEntries = cardEntries.slice(0, SHRUNK_DISPLAYED_ITEM_COUNT);
    }

    return (
      <ProfileCardController
        form={form}
        formName={formName}
        cardName={cardName}
        editOptionPaths={editOptionPaths}
      >
        <Grid className="historyList" divided="vertically">
          {usedEntries.map((value, index) => (
            <Grid.Row>
              <Grid.Column width={16}>
                <Grid>
                  <Grid.Row>
                    <Grid.Column className="entryName" width={8}>
                      {bindedRenderValue(
                        value.header ||
                          (value.diploma && value.diploma.description)
                      )}
                    </Grid.Column>
                    <Grid.Column className="dateInfo" width={8}>
                      {this.renderDateString(value)}
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column
                      style={{
                        color: "#555555",
                        fontWeight: "bold",
                        paddingBottom: "8pt"
                      }}
                      width={16}
                    >
                      {bindedRenderValue(
                        value.subheader ||
                          (value.school && value.school.description)
                      )}
                    </Grid.Column>
                  </Grid.Row>
                  {value.content && (
                    <Grid.Row>
                      <Grid.Column width={16}>
                        {value.content.split("\n").map((text, index) => (
                          <p style={{ marginBottom: "0px" }}>{text}</p>
                        ))}
                      </Grid.Column>
                    </Grid.Row>
                  )}
                </Grid>
              </Grid.Column>
            </Grid.Row>
          ))}
        </Grid>
        {this.renderSizeButton()}
      </ProfileCardController>
    );
  }

  /** Renders the button used to expand / shrink the history card */
  renderSizeButton() {
    const { cardEntries, expanded, handleToggleExpanded, intl } = this.props;

    const expandable = cardEntries.length > 2;

    if (expandable) {
      return (
        <div className="resizeButtonContainer">
          <a className="blueColoredText" onClick={handleToggleExpanded}>
            {expanded
              ? "- " + intl.formatMessage({ id: "profile.shrink" })
              : "+ " + intl.formatMessage({ id: "profile.expand" })}
          </a>
        </div>
      );
    }
    return null;
  }

  /** Renders a string describing the start and end date of a history item
   *
   * @param {PropTypes.object} item the history item who's date should be rendered
   */
  renderDateString(item) {
    return moment(item.startDate).isValid()
      ? moment(item.startDate).format("MMM YYYY") +
          " - " +
          (moment(item.endDate).isValid()
            ? moment(item.endDate).format("MMM YYYY")
            : "Present")
      : "";
  }
}

export default injectIntl(HistoryCardView);
