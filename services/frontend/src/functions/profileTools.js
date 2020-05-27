import React from "react";
import PropTypes from "prop-types";

/**
 * Renders either a provided value or a fallback message
 * @param {PropTypes.object} intl intl-react translation object
 * @param {PropTypes.element} profileValue the value to render
 * @param {PropTypes.string} fallbackIntlId the formatted message id that is used if profileValue is falsey or an empty string
 * @param {PropTypes.bool} forceFallback forces the fallback message to be displayed even if profileValue is valid
 */
export function renderValue(intl, profileValue, fallbackIntlId, forceFallback) {
  if (!profileValue || profileValue === "" || forceFallback) {
    if (fallbackIntlId !== null) {
      return (
        <span className="greyedOut">
          {intl.formatMessage({ id: fallbackIntlId || "profile.undefined" })}
        </span>
      );
    }
    return null;
  }
  return profileValue;
}
