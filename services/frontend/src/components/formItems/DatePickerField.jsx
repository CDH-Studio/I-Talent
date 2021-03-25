import { useState } from "react";
import PropTypes from "prop-types";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { makeStyles, ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import DayJSUtils from "@date-io/dayjs";
import dayjs from "dayjs";
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
      onChange({ ...changedValue });
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
      width: "100%",
      "background-color": antdStyles["@layout-header-background"],
      padding: "0px 0px 0px 0px",
      "border-radius": antdStyles["@border-radius-base"],
      "padding-left": "10px",
      "-webkit-transition": "all 0.3s, height 0s",
      transition: "all 0.3s, height 0s",
      border: "1px solid #d9d9d9",
      "&:hover": {
        border: "1px solid #1d807b",
      },
      "& .MuiInputBase-root": {
        "font-size": "inherit",
        "font-family": "inherit",
      },
      "& .MuiIconButton-root": {
        padding: "3px",
        "margin-right": "4px",
      },
      "& .MuiSvgIcon-root": {
        width: "20px",
        height: "20px",
      },
    },
  }));

  const classes = useStyles();

  const materialTheme = createMuiTheme({
    palette: {
      primary: {
        main: antdStyles["@primary-color"],
        light: antdStyles["@primary-color"],
        dark: antdStyles["@primary-color"],
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
          variant="inline"
          openTo="year"
          views={viewOptions}
          emptyLabel={placeholderText}
          format={formatDate}
          className={classes.root}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          InputProps={{
            disableUnderline: true,
          }}
          value={selectedDate}
          onChange={(event) => onDateChange(event)}
          minDate={getMinDate()}
          maxDate={getMaxDate()}
          disabled={disableInput}
        />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

DatePickerField.propTypes = {
  onChange: PropTypes.func,
  placeholderText: PropTypes.string.isRequired,
  defaultDate: PropTypes.instanceOf(Object),
  viewOptions: PropTypes.arrayOf(String),
  disableWhen: PropTypes.instanceOf(Object),
  formatDate: PropTypes.string.isRequired,
  disableInput: PropTypes.bool,
};

DatePickerField.defaultProps = {
  defaultDate: null,
  onChange: null,
  viewOptions: ["date", "month", "year"],
  disableWhen: null,
  disableInput: false,
};

export default DatePickerField;
