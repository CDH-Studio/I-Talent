import { Checkbox, Input, Select } from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";
import moment from "moment";

/** Generates props that commonly need to to be passed to form fields */
export const generateCommonFormProps = (
  props,
  name,
  control,
  tempField,
  disableDoNotSpecify
) => {
  const {
    editProfileOptions,
    getCurrentValue,
    intl,
    onFieldChange,
    onTempFieldChange,
    profileInfo,
    tempFields,
    unchangeableInfo
  } = props;

  //convert camelcase to `.` seperated and add `profile.` to beginning
  let intlId = "profile." + name.replace(/([A-Z])/g, ".$1").toLowerCase();
  const hasUnchangableValue = unchangeableInfo && unchangeableInfo[name]; // && unchangeableInfo !== "";

  let commonProps = {
    className: hasUnchangableValue ? "unchangeableField" : "",
    control: control,
    disabled: hasUnchangableValue,
    fluid: true,
    label: intl.formatMessage({ id: intlId }),
    name: name,
    onChange: tempField ? onTempFieldChange : onFieldChange
  };

  if (control === Checkbox) {
    commonProps.defaultChecked =
      (profileInfo && profileInfo[name]) || (tempFields && tempFields[name]);
  } else if (control === Select) {
    commonProps.search = true;

    if (disableDoNotSpecify) {
      commonProps.options = editProfileOptions[name];
    } else {
      commonProps.options = name in editProfileOptions && [
        {
          key: null,
          value: null,
          text: props.intl.formatMessage({ id: "profile.do.not.specify" })
        },
        ...editProfileOptions[name]
      ];
    }
    commonProps.defaultValue =
      profileInfo[name] && (profileInfo[name].id || profileInfo[name]);

    //commonProps.disabled = false;
  } else if (control === Input) {
    commonProps.placeholder = profileInfo[name];
    commonProps.defaultValue = hasUnchangableValue
      ? unchangeableInfo[name]
      : profileInfo[name];
  } else if (control === DateInput) {
    let currentValue = getCurrentValue(name);
    commonProps.value = currentValue
      ? moment(currentValue).format("MMM DD YYYY")
      : null;
    commonProps.iconPosition = "right";
    commonProps.closable = commonProps.dateFormat = "MMM DD YYYY";
  }

  return commonProps;
};

/** translate descriptions that  */
export function formatOptions(options) {
  let newOptions = [];
  options.forEach(value =>
    newOptions.push({
      key: value["id"],
      value: value["id"],
      text:
        value["description"][localStorage.getItem("lang")] ||
        value["description"]
    })
  );
  return newOptions;
}
