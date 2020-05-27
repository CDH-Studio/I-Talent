import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";
import { injectIntl } from "react-intl";
import { FormattedMessage } from "react-intl";

/**
 * UI for buttons to include in forms
 */
class FormButtonsView extends Component {
  static propTypes = {
    /** I'm not sure if this is needed */
    fields: PropTypes.any,
    /** function to apply an edit to a card */
    handleApply: PropTypes.func,
    /** function to cancel editting a card */
    handleCancel: PropTypes.func,
    /** function to go to next form on /setup route */
    handleNext: PropTypes.func,
    /** function to go to previous form on /setup route */
    handlePrevious: PropTypes.func,
    /** intl-react translation object */
    intl: PropTypes.object,
    /** Whether this is an early register or not */
    isEarlyRegister: PropTypes.bool
  };

  render() {
    return (
      <div style={{ width: "100%", paddingTop: "20px" }}>
        {this.renderEditButtonGroup() || this.renderRegisterButtonGroup()}
      </div>
    );
  }

  /** renders the apply & cancel buttons present when editing the modal */
  renderEditButtonGroup() {
    const { handleApply, handleCancel, intl } = this.props;
    return (
      handleApply &&
      handleCancel && (
        <div
          style={{
            float: "right",
            marginBottom: "15px"
          }}
        >
          <Button type="button" onClick={handleApply} color="blue">
            {intl.formatMessage({ id: "button.apply" })}
          </Button>

          <Button type="button" color="blue" onClick={handleCancel} secondary>
            {intl.formatMessage({ id: "button.cancel" })}
          </Button>
        </div>
      )
    );
  }

  /** Renders the Next, back & finish buttons present when on the /setup route */
  renderRegisterButtonGroup() {
    const {
      fields,
      handleNext,
      handlePrevious,
      handleRegister,
      intl,
      isEarlyRegister
    } = this.props;
    return (
      handleRegister && (
        <React.Fragment>
          {/* render the 'Finish early' button if necessary */}
          {isEarlyRegister && (
            <Button type="button" color="blue" onClick={handleRegister}>
              <FormattedMessage id="setup.save.and.finish" />
            </Button>
          )}

          <div
            style={{
              float: "right",
              marginBottom: "15px"
            }}
          >
            <Button
              color="blue"
              disabled={!Boolean(handlePrevious)}
              onClick={e => handlePrevious(fields)}
              secondary
              type="button"
            >
              {intl.formatMessage({ id: "button.back" })}
            </Button>

            {handleNext && isEarlyRegister && (
              <Button
                color="blue"
                onClick={e => handleNext(fields)}
                type="button"
              >
                {intl.formatMessage({ id: "button.next" })}
              </Button>
            )}

            {handleRegister && !isEarlyRegister && (
              <Button type="button" color="blue" onClick={handleRegister}>
                {intl.formatMessage({ id: "button.finish" })}
              </Button>
            )}
          </div>
        </React.Fragment>
      )
    );
  }
}

export default injectIntl(FormButtonsView);
