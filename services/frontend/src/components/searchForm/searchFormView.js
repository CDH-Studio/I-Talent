import React, { Component } from "react";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import { Button, Checkbox, Form, Input, Select } from "semantic-ui-react";

/** UI for search forms used in /home and /results routes */
class SearchFormView extends Component {
  static propTypes = {
    /** Object with key value pairs of <option name>:<array of some sort of options> */
    advancedOptions: PropTypes.objectOf(PropTypes.array),
    /** Whether advanced search fields are available. NOTE: This can either mean advanced search on home page or filter on results page */
    advancedSearch: PropTypes.bool,
    /** Default values for fields. NOTE: Currently only used on results page */
    defaultValues: PropTypes.object,
    /** Whether search button should be disabled because of no field changes or not */
    disableSearch: PropTypes.bool,
    /** Function to call if the advancedOptions being passed by props are currently null and advanced options are needed */
    getAdvancedOptions: PropTypes.func,
    /** Function called when a field changes */
    handleChange: PropTypes.func.isRequired,
    /** Function called when a search is performed */
    handleSubmit: PropTypes.func.isRequired,
    /** Function called when toggling between basic and advanced search on home page */
    handleToggle: PropTypes.func.isRequired,
    /** intl-react translation object */
    intl: PropTypes.object.isRequired,
    /** The maximum width the form should try and use */
    maxFormWidth: PropTypes.number.isRequired,
    /** Whether the search bar is using the navigation bar layout. NOTE: the way I wrote the code you still need to specify advancedSearch to get advanced fields */
    navBarLayout: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.renderAdvancedFields = this.renderAdvancedFields.bind(this);
  }

  render() {
    const {
      advancedOptions,
      advancedSearch,
      defaultValues,
      handleChange,
      handleSubmit,
      maxFormWidth
    } = this.props;

    return (
      <Form
        loading={advancedSearch && !advancedOptions}
        style={{
          margin: "0px auto",
          paddingLeft: "50px",
          paddingRight: "50px",
          width: maxFormWidth
        }}
      >
        {/* render correct search fields. NOTE: renderAdvancedSearchFields will also render a broad search field and apply button if navBarLayout is true */}
        <label htmlFor="search" hidden={true}>
          Search
        </label>
        {advancedSearch ? (
          this.renderAdvancedFields()
        ) : (
          <Form.Field
            control={Input}
            placeholder="Search"
            name="searchValue"
            id="search"
            defaultValue={defaultValues["searchValue"]}
            name="searchValue"
            id="searchValueField"
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        )}

        {this.renderMainButtons()}
      </Form>
    );
  }

  /** Renders the search and toggle search type buttons below the form */
  renderMainButtons() {
    const {
      advancedSearch,
      disableSearch,
      handleSubmit,
      handleToggle,
      intl,
      navBarLayout
    } = this.props;
    return (
      !navBarLayout && (
        <Form.Group style={{ padding: "0 auto" }}>
          <Form.Group style={{ margin: "0 auto" }}>
            <Form.Field
              color="blue"
              content={intl.formatMessage({ id: "button.search" })}
              control={Button}
              //disabled={disableSearch}
              fluid
              id="searchButtonField"
              onClick={handleSubmit}
              style={{ width: "200px" }}
            />
            {handleToggle && (
              <Form.Field
                //basic
                content={intl.formatMessage({
                  id: advancedSearch
                    ? "button.basic.search"
                    : "button.advanced.search"
                })}
                control={Button}
                id="toggleButtonField"
                fluid
                onClick={handleToggle}
                style={{ width: "200px" }}
              />
            )}
          </Form.Group>
        </Form.Group>
      )
    );
  }

  /**
   * Generates props for a form field
   * @param {PropTypes.string} name the name of the field.
   */
  generateCommonProps(name) {
    const { defaultValues, handleChange, handleSubmit } = this.props;

    let defaultVal = defaultValues[name];

    let retVal = {
      fluid: true,
      name: name,
      onChange: handleChange,
      onSubmit: handleSubmit,
      id: name + "Field"
    };

    if (name === "exFeeder") {
      retVal.defaultChecked = defaultVal && defaultVal !== "false";
    } else {
      retVal.defaultValue = defaultVal;
    }

    return retVal;
  }

  /**
   * Render advanced form fields. If navBarLayout is true, a broad search and apply button will be included and all elements will be in a form group.
   */
  renderAdvancedFields() {
    const {
      advancedOptions,
      disableSearch,
      getAdvancedOptions,
      handleSubmit,
      intl,
      navBarLayout
    } = this.props;

    if (!advancedOptions) {
      getAdvancedOptions();
      return null;
    }

    const fields = (
      <React.Fragment>
        {navBarLayout && (
          <Form.Field
            control={Input}
            label={intl.formatMessage({
              id: "advanced.search.form.broad.search"
            })}
            {...this.generateCommonProps("searchValue")}
          />
        )}
        <Form.Field
          control={Input}
          label={intl.formatMessage({ id: "advanced.search.form.name" })}
          {...this.generateCommonProps("name")}
        />

        <Form.Field
          control={Select}
          label={intl.formatMessage({ id: "advanced.search.form.skills" })}
          multiple
          options={advancedOptions.developmentalGoals}
          search
          {...this.generateCommonProps("skills")}
        />
        <Form.Field
          control={Select}
          label={intl.formatMessage({ id: "advanced.search.form.branch" })}
          multiple
          options={advancedOptions.branch}
          search
          {...this.generateCommonProps("branch")}
        />
        <Form.Field
          control={Select}
          label={intl.formatMessage({ id: "advanced.search.form.location" })}
          multiple
          options={advancedOptions.location}
          search
          {...this.generateCommonProps("location")}
        />
        <Form.Field
          control={Select}
          label={intl.formatMessage({
            id: "advanced.search.form.classification"
          })}
          multiple
          options={advancedOptions.classification}
          search
          {...this.generateCommonProps("classification")}
        />
        <Form.Field
          control={Checkbox}
          label={intl.formatMessage({ id: "advanced.search.form.ex.feeder" })}
          {...this.generateCommonProps("exFeeder")}
        />
        {navBarLayout && (
          <Form.Field
            color="blue"
            content={intl.formatMessage({ id: "button.apply" })}
            control={Button}
            disabled={disableSearch}
            fluid
            id="applyButtonField"
            onClick={handleSubmit}
            style={{ width: "200px" }}
          />
        )}
      </React.Fragment>
    );

    if (navBarLayout) {
      console.log("NAV BAR LAYOUT DETECTED?", navBarLayout);
      return <Form.Group widths="equal">{fields}</Form.Group>;
    }
    return fields;
  }
}

export default injectIntl(SearchFormView);
