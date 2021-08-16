import { useState } from "react";
import DayJSUtils from "@date-io/dayjs";
import { createMuiTheme } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { makeStyles,ThemeProvider } from "@material-ui/styles";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import antdStyles from "../../styling/antdTheme";

const DatePickerField = ({
  onChange,
  placeholderText,
  defaultDate,
  viewOptions,
  disableWhen,
  formatDate,
  disableInput,
}) => {
  const [selectedDate, changeDate] = useState(defaultDate);

  const triggerChange = (changedValue) => {
    if (typeof onChange === "function") {
      onChange(changedValue);
    }
  };
  // eslint-disable-next-line no-unused-vars
  const onDateChange = (startDateVal) => {
    if (dayjs(startDateVal).isValid()) {
      changeDate(startDateVal);
    }
    triggerChange(startDateVal);
  };

  const useStyles = makeStyles(() => ({
    root: {
      "& .MuiIconButton-root": {
        "margin-right": "4px",
        padding: "3px",
      },
      "& .MuiInputBase-root": {
        "font-family": "inherit",
        "font-size": "inherit",
      },
      "& .MuiSvgIcon-root": {
        height: "20px",
        width: "20px",
      },
      "&:hover": {
        border: "1px solid #1d807b",
      },
      "-webkit-transition": "all 0.3s, height 0s",
      "background-color": antdStyles["@layout-header-background"],
      border: "1px solid #d9d9d9",
      "border-radius": antdStyles["@border-radius-base"],
      padding: "0px 0px 0px 0px",
      "padding-left": "10px",
      transition: "all 0.3s, height 0s",
      width: "100%",
    },
  }));

  const classes = useStyles();

  const materialTheme = createMuiTheme({
    palette: {
      primary: {
        dark: antdStyles["@primary-color"],
        light: antdStyles["@primary-color"],
        main: antdStyles["@primary-color"],
      },
    },
  });

  function getMinDate() {
    if (
      disableWhen !== null &&
      disableWhen !== undefined &&
      disableWhen.minDate !== null &&
      disableWhen.minDate !== undefined
    ) {
      return disableWhen.minDate;
    }
    return undefined;
  }

  function getMaxDate() {
    if (
      disableWhen !== null &&
      disableWhen !== undefined &&
      disableWhen.maxDate !== null &&
      disableWhen.maxDate !== undefined
    ) {
      return disableWhen.maxDate;
    }
    return undefined;
  }

  return (
    <ThemeProvider theme={materialTheme}>
      <MuiPickersUtilsProvider utils={DayJSUtils}>
        <KeyboardDatePicker
          autoOk="true"
          className={classes.root}
          disabled={disableInput}
          emptyLabel={placeholderText}
          format={formatDate}
          InputProps={{
            disableUnderline: true,
          }}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          maxDate={getMaxDate()}
          minDate={getMinDate()}
          onChange={(event) => onDateChange(event)}
          openTo="year"
          value={selectedDate}
          variant="inline"
          views={viewOptions}
        />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

DatePickerField.propTypes = {
  defaultDate: PropTypes.instanceOf(Object),
  disableInput: PropTypes.bool,
  disableWhen: PropTypes.instanceOf(Object),
  formatDate: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholderText: PropTypes.string.isRequired,
  viewOptions: PropTypes.arrayOf(String),
};

DatePickerField.defaultProps = {
  defaultDate: null,
  disableInput: false,
  disableWhen: null,
  onChange: null,
  viewOptions: ["date", "month", "year"],
};

export default DatePickerField;
