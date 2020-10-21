import React from "react";

import { Row, Button } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import "./DescriptionTextView.scss";

const DescriptionTextView = ({
  text,
  expandable,
  expanded,
  handleExpandButtonClick,
}) => {
  const generateDescriptionBody = () => {
    if (expanded || !expandable) {
      if (text) {
        const lineStrings = text.split(" ").join("\u00A0").split("\n");
        return (
          <div className="bodyStyle">
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
            className="experienceDescriptionToggleTag"
          >
            {expanded ? <UpOutlined /> : <DownOutlined />}
            <span className="expandDescriptionToggleTagText">
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
