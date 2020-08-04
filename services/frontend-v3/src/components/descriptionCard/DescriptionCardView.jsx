import React from "react";
import PropTypes from "prop-types";

const DescriptionView = ({ data }) => {
  /**
   * Generate Competencies Tag List
   *
   * Generate a list of Competency Tags
   * If no competencies are found for the profile then display friendly message
   */
  const styles = {
    bodyStyle: {
      overflowWrap: "break-word",
      whiteSpace: "pre-wrap",
      overflow: "auto",
      maxHeight: "225px",
    },
  };

  const generateDescriptionBody = () => {
    if (!data.description) {
      return null;
    }

    const lineStrings = data.description.split(" ").join("\u00A0").split("\n");
    return lineStrings.map((line, index) => (
      <>
        {index > 0 ? <br /> : null} {line}
      </>
    ));
  };

  return <div style={styles.bodyStyle}>{generateDescriptionBody()}</div>;
};

DescriptionView.propTypes = {
  data: PropTypes.objectOf({ description: PropTypes.string }),
};

DescriptionView.defaultProps = {
  data: null,
};

export default DescriptionView;
