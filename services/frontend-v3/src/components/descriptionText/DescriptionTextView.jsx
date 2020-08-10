import React from "react";

import { Row, Button } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";

const DescriptionTextView = ({
  text,
  expandable,
  expanded,
  handleExpandButtonClick,
}) => {
  const styles = {
    experienceDescriptionToggleTag: {
      color: "rgba(0, 0, 0, 0.85)",
      paddingTop: "8px",
    },
    expandDescriptionToggleTagText: {
      paddingLeft: "5px",
    },
    bodyStyle: {
      whiteSpace: "pre-wrap",
      overflow: "auto",
      maxHeight: "400px",
      wordBreak: "break-all",
    },
  };

  const generateDescriptionBody = () => {
    if (expanded || !expandable) {
      if (text) {
        const lineStrings = text.split(" ").join("\u00A0").split("\n");
        return (
          <div style={styles.bodyStyle}>
            {lineStrings.map((line, index) => (
              <>
                {index > 0 ? <br /> : null} {line}
              </>
            ))}
          </div>
        );
      }

      return "-";
    }

    return undefined;
  };

  const generateExpandButton = () => {
    if (text && expandable) {
      return (
        <Row>
          <Button
            type="link"
            onClick={handleExpandButtonClick}
            style={styles.experienceDescriptionToggleTag}
          >
            {expanded ? <UpOutlined /> : <DownOutlined />}
            <span style={styles.expandDescriptionToggleTagText}>
              <FormattedMessage id="profile.career.content.name" />
            </span>
          </Button>
        </Row>
      );
    }

    return undefined;
  };

  return (
    <>
      {generateDescriptionBody()}
      {generateExpandButton()}
    </>
  );
};

DescriptionTextView.propTypes = {
  text: PropTypes.string,
  expandable: PropTypes.bool.isRequired,
  expanded: PropTypes.bool.isRequired,
  handleExpandButtonClick: PropTypes.func.isRequired,
};

DescriptionTextView.defaultProps = {
  text: null,
};

export default DescriptionTextView;
