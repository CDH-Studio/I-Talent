import PropTypes from "prop-types";
import "./DescriptionTextView.less";

const DescriptionTextView = ({ text, expandable, expanded }) => {
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

  return <>{generateDescriptionBody()}</>;
};

DescriptionTextView.propTypes = {
  text: PropTypes.string,
  expandable: PropTypes.bool.isRequired,
  expanded: PropTypes.bool.isRequired,
};

DescriptionTextView.defaultProps = {
  text: null,
};

export default DescriptionTextView;
